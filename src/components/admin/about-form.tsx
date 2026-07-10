"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateAboutContent } from "@/lib/actions/admin";
import type { AboutContent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = { ok: boolean; error?: string } | null;

export function AboutForm({ about, disabled }: { about: AboutContent; disabled?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => updateAboutContent(formData),
    null as FormState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="title">Başlık</Label>
        <Input id="title" name="title" defaultValue={about.title} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea id="description" name="description" defaultValue={about.description} rows={4} className="mt-1.5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mission">Misyon</Label>
          <Textarea id="mission" name="mission" defaultValue={about.mission} rows={3} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="vision">Vizyon</Label>
          <Textarea id="vision" name="vision" defaultValue={about.vision} rows={3} className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="management_message">Yönetim Mesajı</Label>
        <Textarea
          id="management_message"
          name="management_message"
          defaultValue={about.managementMessage}
          rows={3}
          className="mt-1.5"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Değerler ve zaman çizelgesi (values / timeline) şu an yalnızca veritabanından
        JSON olarak düzenlenebilir; bu alanlar için özel düzenleyici bir sonraki
        fazda eklenecektir.
      </p>

      {state?.error && <p className="text-sm text-dail-red-500">{state.error}</p>}
      {state?.ok && !isPending && <p className="text-sm text-emerald-600">Kaydedildi.</p>}

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
