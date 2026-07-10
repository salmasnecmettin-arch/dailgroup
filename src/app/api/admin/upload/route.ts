import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/status";

export const runtime = "nodejs";

/**
 * Every upload is normalized to one fixed size + WEBP so all images in a
 * given slot (cover photo, logo, hero background) look visually consistent
 * regardless of what the admin uploads.
 */
const VARIANTS = {
  hero: { width: 1920, height: 1080, fit: "cover" as const },
  cover: { width: 1600, height: 1000, fit: "cover" as const },
  gallery: { width: 1200, height: 900, fit: "cover" as const },
  logo: { width: 480, height: 240, fit: "contain" as const },
};

type Kind = keyof typeof VARIANTS;

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase bağlı değil." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile || !["admin", "editor", "staff"].includes(profile.role)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kindRaw = String(formData.get("kind") ?? "cover");
  const kind: Kind = kindRaw in VARIANTS ? (kindRaw as Kind) : "cover";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Sadece görsel dosyaları yüklenebilir." }, { status: 400 });
  }

  const variant = VARIANTS[kind];
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  let outputBuffer: Buffer;
  try {
    outputBuffer = await sharp(inputBuffer)
      .resize(variant.width, variant.height, {
        fit: variant.fit,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Görsel işlenemedi. Dosya bozuk olabilir." }, { status: 400 });
  }

  const path = `${kind}/${randomUUID()}.webp`;
  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from("media")
    .upload(path, outputBuffer, { contentType: "image/webp", upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicUrlData } = admin.storage.from("media").getPublicUrl(path);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
