"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { inquirySchema, type InquiryInput } from "@/lib/validation/inquiry";
import { submitInquiry } from "@/lib/actions/submit-inquiry";
import type { Brand } from "@/lib/types";
import { cn } from "@/lib/utils";

export function InquiryForm({
  type,
  brands,
  defaultServiceSlug,
  dark = false,
}: {
  type: "teklif" | "iletisim";
  brands: Brand[];
  defaultServiceSlug?: string;
  dark?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      type,
      serviceSlug: defaultServiceSlug ?? "",
      kvkkConsent: false,
    },
  });

  const onSubmit = async (values: InquiryInput) => {
    setServerError(null);
    const res = await submitInquiry(values);
    if (res.ok) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(res.error);
    }
  };

  const inputClass = cn(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:ring-2",
    dark
      ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-dail-red-500 focus:ring-dail-red-500/30"
      : "border-dail-navy-900/10 bg-white text-dail-navy-900 placeholder:text-dail-navy-900/30 focus:border-dail-red-500 focus:ring-dail-red-500/20",
  );

  const labelClass = cn(
    "mb-1.5 block text-sm font-medium",
    dark ? "text-white/70" : "text-dail-navy-900/70",
  );

  const errorClass = "mt-1 text-xs text-dail-red-400";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl px-8 py-16 text-center",
          dark ? "bg-white/5" : "bg-dail-navy-50",
        )}
      >
        <CheckCircle2 className="h-12 w-12 text-dail-red-500" />
        <h3
          className={cn(
            "font-display text-xl font-bold",
            dark ? "text-white" : "text-dail-navy-900",
          )}
        >
          Talebiniz alındı!
        </h3>
        <p className={dark ? "text-white/60" : "text-dail-navy-900/60"}>
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-3 text-sm font-semibold text-dail-red-500 hover:underline"
        >
          Yeni bir talep gönder
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("type")} value={type} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Ad Soyad</label>
          <input className={inputClass} placeholder="Adınız Soyadınız" {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Firma</label>
          <input className={inputClass} placeholder="Firma adı (opsiyonel)" {...register("company")} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Telefon</label>
          <input className={inputClass} placeholder="05XX XXX XX XX" {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>E-posta</label>
          <input className={inputClass} placeholder="ornek@eposta.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Hizmet / Bayilik</label>
        <select className={inputClass} {...register("serviceSlug")}>
          <option value="">Seçiniz</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Mesajınız</label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="Talebinizi kısaca açıklayın"
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="kvkk"
          className="mt-1 h-4 w-4 shrink-0 accent-dail-red-500"
          {...register("kvkkConsent")}
        />
        <label
          htmlFor="kvkk"
          className={cn("text-xs leading-relaxed", dark ? "text-white/60" : "text-dail-navy-900/60")}
        >
          Kişisel verilerimin, talebimin değerlendirilmesi amacıyla KVKK
          kapsamında işlenmesini kabul ediyorum.
        </label>
      </div>
      {errors.kvkkConsent && <p className={errorClass}>{errors.kvkkConsent.message}</p>}

      {serverError && <p className="text-sm text-dail-red-500">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-dail-red-500 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.01] hover:bg-dail-red-600 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {type === "teklif" ? "Gönder" : "Mesajı Gönder"}
      </button>
    </form>
  );
}
