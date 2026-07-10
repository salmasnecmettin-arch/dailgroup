import { cn } from "@/lib/utils";

/**
 * Typographic recreation of the DAIL GROUP wordmark using brand colors.
 * The client's source file is a PDF; once a vector/PNG export of the
 * official monogram is provided, swap this for an <Image> of that asset.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-baseline gap-[2px] text-2xl font-extrabold tracking-tight",
        className,
      )}
    >
      <span className="text-dail-red-500">DAIL</span>
      <span className={tone === "dark" ? "text-dail-navy-500" : "text-white"}>
        GROUP
      </span>
    </span>
  );
}
