"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Kind = "hero" | "cover" | "gallery" | "logo" | "footer";

export function ImageUploadField({
  name,
  label,
  kind,
  defaultValue,
  disabled,
  hint,
}: {
  name: string;
  label: string;
  kind: Kind;
  defaultValue?: string;
  disabled?: boolean;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("kind", kind);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Yükleme başarısız.");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (disabled) return;
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative mt-1.5 flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-dail-navy-900/15 bg-dail-navy-50 transition-colors hover:border-dail-red-400",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />

        {url ? (
          <>
            <Image src={url} alt={label} fill className="object-contain p-2" unoptimized />
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl("");
                }}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Kaldır"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-dail-navy-900/40">
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs">Görsel sürükleyin veya tıklayın</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 className="h-6 w-6 animate-spin text-dail-red-500" />
          </div>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-xs text-dail-red-500">{error}</p>}
    </div>
  );
}
