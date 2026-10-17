"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Home Visits", href: "#home-visits" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#booking" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-ink/92 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/65 to-transparent",
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[86px] lg:px-12">
          <Logo onClick={close} />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65 transition-colors duration-300 hover:text-cream"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="group hidden items-center gap-2 bg-gold px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-gold-light sm:inline-flex"
            >
              Book Now
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-grid size-10 place-items-center border border-white/20 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "h-px origin-left bg-gold/60 transition-transform duration-500",
            scrolled ? "scale-x-100" : "scale-x-0",
          )}
        />
      </header>

      {open && (
        <div
          id="mobile-navigation"
          className="menu-in fixed inset-0 z-40 flex min-h-[100svh] flex-col overflow-y-auto bg-ink lg:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(199,162,91,0.1),transparent_38%)]"
          />
          <nav
            aria-label="Mobile navigation"
            className="relative mt-[74px] flex flex-1 flex-col px-5 pb-10 pt-10 sm:px-8 sm:pt-14"
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="group flex items-center justify-between border-b border-white/10 py-5 transition-colors hover:border-gold/40"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-display text-xs tracking-[0.1em] text-gold/60">
                      0{index + 1}
                    </span>
                    <span className="font-display text-4xl uppercase tracking-[0.04em] text-cream transition-colors group-hover:text-gold sm:text-5xl">
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-cream/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    strokeWidth={1.6}
                  />
                </a>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <a
                href="#booking"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink"
              >
                Book an appointment
                <ArrowUpRight className="size-4" />
              </a>
              <div className="mt-6 flex items-start justify-between gap-6 text-[10px] uppercase leading-5 tracking-[0.15em] text-cream/35">
                <p>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </p>
                <p className="text-right">
                  In the studio
                  <br />
                  Or at your door
                </p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
