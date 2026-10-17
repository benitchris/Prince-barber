import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionLabel({
  index,
  children,
  tone = "light",
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.27em]",
        tone === "light" ? "text-gold" : "text-gold-dark",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-xs tracking-[0.12em]",
          tone === "light" ? "text-cream/35" : "text-ink/35",
        )}
      >
        {index}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "light" ? "bg-gold/55" : "bg-gold-dark/55",
        )}
      />
      <span>{children}</span>
    </p>
  );
}
