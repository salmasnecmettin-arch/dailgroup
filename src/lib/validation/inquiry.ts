import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["teklif", "iletisim"]),
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalı"),
  company: z.string().optional(),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.email("Geçerli bir e-posta girin").optional().or(z.literal("")),
  serviceSlug: z.string().optional(),
  message: z.string().min(5, "Mesajınızı biraz daha detaylandırın"),
  kvkkConsent: z
    .boolean()
    .refine((v) => v === true, "Devam etmek için KVKK metnini onaylamalısınız"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
