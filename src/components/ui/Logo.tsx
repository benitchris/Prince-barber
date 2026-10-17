import Link from "next/link";
import { Crown } from "lucide-react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  light?: boolean;
};

export function Logo({ className, onClick, light = true }: LogoProps) {
  return (
    <Link
      href="#home"
      onClick={onClick}
      aria-label="Prince Barber — back to top"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative grid size-10 shrink-0 place-items-center border border-gold/60 transition-colors duration-300 group-hover:border-gold sm:size-11">
        <span className="absolute -left-px -top-px size-1.5 bg-gold" />
        <span className="absolute -bottom-px -right-px size-1.5 bg-gold" />
        <Crown
          className="size-[18px] text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
          strokeWidth={1.4}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] tracking-[0.14em]",
            light ? "text-cream" : "text-ink",
          )}
        >
          PRINCE
        </span>
        <span
          className={cn(
            "mt-1 text-[0.52rem] font-bold uppercase tracking-[0.47em]",
            light ? "text-gold" : "text-gold-dark",
          )}
        >
          Barber
        </span>
      </span>
    </Link>
  );
}
