"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BrandDialog } from "./brand-dialog";
import { deleteBrand } from "@/lib/actions/admin";
import type { Brand } from "@/lib/types";

const categoryLabel: Record<Brand["category"], string> = {
  gida: "Gıda",
  icecek: "İçecek",
  insaat: "İnşaat",
};

export function BrandsTable({ brands, disabled }: { brands: Brand[]; disabled?: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marka</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Sıra</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.slug}>
            <TableCell>
              <p className="font-medium">{brand.name}</p>
              <p className="text-xs text-muted-foreground">/hizmetler/{brand.slug}</p>
            </TableCell>
            <TableCell>{categoryLabel[brand.category]}</TableCell>
            <TableCell>{brand.order}</TableCell>
            <TableCell>
              <Badge variant={brand.active ? "default" : "secondary"}>
                {brand.active ? "Aktif" : "Pasif"}
              </Badge>
            </TableCell>
            <TableCell className="flex justify-end gap-1">
              <BrandDialog brand={brand} disabled={disabled} />
              <button
                disabled={disabled || isPending}
                onClick={() => {
                  if (confirm(`${brand.name} silinsin mi?`)) {
                    startTransition(async () => {
                      await deleteBrand(brand.slug);
                    });
                  }
                }}
                className="rounded-lg p-2 text-dail-red-500 hover:bg-dail-red-500/10 disabled:opacity-50"
                aria-label="Sil"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
