import Image from "next/image";
import { ImageOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a photo when `src` is set; otherwise falls back to a branded
 * gradient + icon treatment (used for sections without source photography
 * yet — e.g. İnşaat Hizmetleri, or a brand whose supplied photos turned out
 * to be a different company's product).
 */
export function CoverMedia({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  fallbackIcon: Icon = ImageOff,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  fallbackIcon?: LucideIcon;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-dail-navy-800 via-dail-navy-900 to-dail-navy-950",
          className,
        )}
      >
        <Icon className="h-20 w-20 text-white/10" strokeWidth={1} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(227,30,36,0.15),transparent_60%)]" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
