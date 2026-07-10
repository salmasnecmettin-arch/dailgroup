"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateHeroContent } from "@/lib/actions/admin";
import type { HeroContent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "./image-upload-field";

type FormState = { ok: boolean; error?: string } | null;

export function HeroForm({ hero, disabled }: { hero: HeroContent; disabled?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => updateHeroContent(formData),
    null as FormState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="eyebrow">Üst Başlık (Eyebrow)</Label>
        <Input id="eyebrow" name="eyebrow" defaultValue={hero.eyebrow} className="mt-1.5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Başlık</Label>
          <Input id="title" name="title" defaultValue={hero.title} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="highlight">Vurgulu Kelime</Label>
          <Input id="highlight" name="highlight" defaultValue={hero.highlight} className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea id="description" name="description" defaultValue={hero.description} className="mt-1.5" rows={3} />
      </div>
      <ImageUploadField
        name="background_image"
        label="Arkaplan Görseli"
        kind="hero"
        defaultValue={hero.backgroundImage}
        disabled={disabled}
        hint="Boş bırakılırsa soyut marka illüstrasyonu gösterilir."
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primary_cta_label">Ana Buton Metni</Label>
          <Input id="primary_cta_label" name="primary_cta_label" defaultValue={hero.primaryCta.label} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="primary_cta_href">Ana Buton Linki</Label>
          <Input id="primary_cta_href" name="primary_cta_href" defaultValue={hero.primaryCta.href} className="mt-1.5" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="secondary_cta_label">İkincil Buton Metni</Label>
          <Input id="secondary_cta_label" name="secondary_cta_label" defaultValue={hero.secondaryCta.label} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="secondary_cta_href">İkincil Buton Linki</Label>
          <Input id="secondary_cta_href" name="secondary_cta_href" defaultValue={hero.secondaryCta.href} className="mt-1.5" />
        </div>
      </div>

      {state?.error && <p className="text-sm text-dail-red-500">{state.error}</p>}
      {state?.ok && !isPending && (
        <p className="text-sm text-emerald-600">Kaydedildi.</p>
      )}

      <button
        type="submit"
        disabled={disabled || isPending}
        className="flex items-center gap-2 rounded-full bg-dail-red-500 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Kaydet
      </button>
    </form>
  );
}
