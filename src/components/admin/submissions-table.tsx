"use client";

import { useMemo, useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteSubmission, updateSubmissionStatus } from "@/lib/actions/admin";
import type { Submission } from "@/lib/admin-data";

const typeLabel: Record<Submission["type"], string> = {
  teklif: "Fiyat Teklifi",
  iletisim: "İletişim",
  ik: "İnsan Kaynakları",
};

const statusLabel: Record<Submission["status"], string> = {
  yeni: "Yeni",
  okundu: "Okundu",
  iletisime_gecildi: "İletişime Geçildi",
  arsivlendi: "Arşivlendi",
};

export function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  const [isPending, startTransition] = useTransition();
  const [typeFilter, setTypeFilter] = useState<Submission["type"] | "hepsi">("hepsi");

  const filtered = useMemo(
    () => (typeFilter === "hepsi" ? submissions : submissions.filter((s) => s.type === typeFilter)),
    [submissions, typeFilter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { hepsi: submissions.length, teklif: 0, iletisim: 0, ik: 0 };
    submissions.forEach((s) => {
      c[s.type] = (c[s.type] ?? 0) + 1;
    });
    return c;
  }, [submissions]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b p-4">
        {(["hepsi", "teklif", "iletisim", "ik"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors " +
              (typeFilter === t
                ? "bg-dail-red-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70")
            }
          >
            {t === "hepsi" ? "Tümü" : typeLabel[t]} ({counts[t] ?? 0})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          Bu kategoride form kaydı yok.
        </p>
      ) : (
        <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tarih</TableHead>
          <TableHead>Tür</TableHead>
          <TableHead>Ad Soyad</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Mesaj</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
              {new Date(s.created_at).toLocaleString("tr-TR")}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{typeLabel[s.type]}</Badge>
            </TableCell>
            <TableCell>
              <p className="font-medium">{s.name}</p>
              {s.company && <p className="text-xs text-muted-foreground">{s.company}</p>}
            </TableCell>
            <TableCell className="whitespace-nowrap">{s.phone}</TableCell>
            <TableCell className="max-w-xs truncate" title={s.message}>
              {s.message}
            </TableCell>
            <TableCell>
              <Select
                defaultValue={s.status}
                disabled={isPending}
                onValueChange={(v) =>
                  startTransition(async () => {
                    await updateSubmissionStatus(s.id, v as Submission["status"]);
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabel).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <button
                disabled={isPending}
                onClick={() => {
                  if (confirm("Bu kayıt silinsin mi?")) {
                    startTransition(async () => {
                      await deleteSubmission(s.id);
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
      )}
    </div>
  );
}
