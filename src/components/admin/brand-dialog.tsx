"use client";

import { useActionState, useState } from "react";
import { Loader2, Pencil, Plus, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertBrand } from "@/lib/actions/admin";
import type { Brand } from "@/lib/types";

type FormState = { ok: boolean; error?: string } | null;

export function BrandDialog({ brand, disabled }: { brand?: Brand; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Brand["category"]>(brand?.category ?? "gida");

  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const res = await upsertBrand(formData);
      if (res.ok) setOpen(false);
      return res;
    },
    null as FormState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {brand ? (
        <DialogTrigger
          className="rounded-lg p-2 hover:bg-muted"
          aria-label="Düzenle"
        >
          <Pencil className="h-4 w-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger
          disabled={disabled}
          className="flex items-center gap-2 rounded-full bg-dail-red-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Yeni Bayilik / Hizmet
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{brand ? "Bayiliği Düzenle" : "Yeni Bayilik Ekle"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="original_slug" value={brand?.slug ?? ""} />
          <input type="hidden" name="category" value={category} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Marka Adı</Label>
              <Input id="name" name="name" required defaultValue={brand?.name} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="short_name">Kısa Ad</Label>
              <Input id="short_name" name="short_name" required defaultValue={brand?.shortName} className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" name="slug" required defaultValue={brand?.slug} placeholder="ornek-marka" className="mt-1.5" />
            </div>
            <div>
              <Label>Kategori</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Brand["category"])}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gida">Gıda Ürünleri</SelectItem>
                  <SelectItem value="icecek">İçecek Grubu</SelectItem>
                  <SelectItem value="insaat">İnşaat Hizmetleri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tagline">Slogan</Label>
            <Input id="tagline" name="tagline" defaultValue={brand?.tagline} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="description">Açıklama</Label>
            <Textarea id="description" name="description" defaultValue={brand?.description} rows={3} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="about">Aydınlatıcı Yazı (ürün sayfasında gösterilir)</Label>
            <Textarea id="about" name="about" defaultValue={brand?.about} rows={4} className="mt-1.5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cover_url">Kapak Görseli (yol)</Label>
              <Input id="cover_url" name="cover_url" defaultValue={brand?.cover} placeholder="/images/.../gorsel.jpg" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="color">Vurgu Rengi</Label>
              <Input id="color" name="color" type="text" defaultValue={brand?.color ?? "#2b2e83"} className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="logo_url">Marka Logosu (yol/URL — anasayfadaki kayan şeritte gösterilir)</Label>
            <Input id="logo_url" name="logo_url" defaultValue={brand?.logo} placeholder="/images/logolar/marka.png" className="mt-1.5" />
            <p className="mt-1 text-xs text-muted-foreground">
              Boş bırakılırsa marka adı yazı olarak gösterilir.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order_index">Sıralama</Label>
              <Input id="order_index" name="order_index" type="number" defaultValue={brand?.order ?? 0} className="mt-1.5" />
            </div>
            <div className="flex items-end gap-2 pb-2.5">
              <input
                type="checkbox"
                id="active"
                name="active"
                defaultChecked={brand?.active ?? true}
                className="h-4 w-4 accent-dail-red-500"
              />
              <Label htmlFor="active">Aktif (sitede görünsün)</Label>
            </div>
          </div>

          {state?.error && <p className="text-sm text-dail-red-500">{state.error}</p>}

          <button
            type="submit"
            disabled={disabled || isPending}
            className="flex items-center gap-2 rounded-full bg-dail-red-500 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
