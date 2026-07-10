"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function GalleryUploadField({
  name,
  label,
  defaultValue,
  disabled,
}: {
  name: string;
  label: string;
  defaultValue?: string[];
  disabled?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.set("file", file);
        body.set("kind", "gallery");
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Yükleme başarısız.");
        setUrls((prev) => [...prev, json.url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Label>{label}</Label>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <div className="mt-1.5 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {urls.map((url, i) => (
          <div key={url + i} className="relative h-24 overflow-hidden rounded-xl bg-dail-navy-50">
            <Image src={url} alt="" fill className="object-cover" unoptimized />
            {!disabled && (
              <button
                type="button"
                onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Kaldır"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex h-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-dail-navy-900/15 text-dail-navy-900/40 hover:border-dail-red-400",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
          <span className="text-[11px]">Ekle</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={disabled}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-dail-red-500">{error}</p>}
    </div>
  );
}
