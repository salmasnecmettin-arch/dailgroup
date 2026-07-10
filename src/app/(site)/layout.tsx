import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";
import { getBrands, getContactInfo } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contactInfo, brands] = await Promise.all([
    getContactInfo(),
    getBrands(),
  ]);

  return (
    <>
      <SmoothScrollProvider />
      <SiteHeader whatsapp={contactInfo.whatsapp} />
      <main className="flex-1">{children}</main>
      <SiteFooter brands={brands} contactInfo={contactInfo} />
      <WhatsAppFloat whatsapp={contactInfo.whatsapp} />
    </>
  );
}
