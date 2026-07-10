import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import type { Brand, ContactInfo } from "@/lib/types";

export function SiteFooter({
  brands,
  contactInfo,
}: {
  brands: Brand[];
  contactInfo: ContactInfo;
}) {
  const gida = brands.filter((b) => b.category === "gida");
  const icecek = brands.filter((b) => b.category === "icecek");

  return (
    <footer className="bg-dail-navy-950 text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Gıda, içecek ve inşaat sektörlerinde kaliteli markalarımız ve
            profesyonel hizmet anlayışımızla yanınızdayız.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">
            Kurumsal
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link href="/hizmetlerimiz" className="hover:text-white">Hizmetlerimiz</Link></li>
            <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
            <li><Link href="/teklif-al" className="hover:text-white">Fiyat Bilgi Formu</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">
            Bayiliklerimiz
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[...gida, ...icecek].map((b) => (
              <li key={b.slug}>
                <Link href={`/hizmetler/${b.slug}`} className="hover:text-white">
                  {b.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">
            İletişim
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-dail-red-500" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-dail-red-500" />
              <span>{contactInfo.email}</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dail-red-500" />
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-3 px-5 py-6 text-xs text-white/40 sm:flex-row sm:justify-between lg:px-8">
          <p>&copy; {new Date().getFullYear()} DAIL GROUP. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <Link href="/gizlilik-politikasi" className="hover:text-white/70">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:text-white/70">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
