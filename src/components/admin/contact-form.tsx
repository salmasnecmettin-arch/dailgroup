"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateContactInfo } from "@/lib/actions/admin";
import type { ContactInfo } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = { ok: boolean; error?: string } | null;

export function ContactForm({ contact, disabled }: { contact: ContactInfo; disabled?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => updateContactInfo(formData),
    null as FormState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="address">Adres</Label>
        <Textarea id="address" name="address" defaultValue={contact.address} rows={2} className="mt-1.5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" defaultValue={contact.phone} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp (ülke koduyla, örn. 905551234567)</Label>
          <Input id="whatsapp" name="whatsapp" defaultValue={contact.whatsapp} className="mt-1.5" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" name="email" defaultValue={contact.email} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="working_hours">Çalışma Saatleri</Label>
          <Input id="working_hours" name="working_hours" defaultValue={contact.workingHours} className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="map_embed_url">Google Maps Embed URL</Label>
        <Textarea id="map_embed_url" name="map_embed_url" defaultValue={contact.mapEmbedUrl} rows={2} className="mt-1.5" />
      </div>

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
