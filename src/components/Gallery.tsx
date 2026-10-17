"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import { gallery } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeItem =
    activeIndex === null ? null : (gallery[activeIndex] ?? null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % gallery.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + gallery.length) % gallery.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [activeIndex]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="/ 04">Selected work</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-7 display-heading text-[clamp(3.2rem,7vw,6.4rem)] text-cream">
                The proof is in
                <br />
                <span className="accent-italic text-gold">the finish.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-[13px] leading-7 text-cream/48 sm:text-sm">
              Clean lines. Considered texture. A finish that holds up outside
              the chair. A closer look at the craft.
            </p>
            <p className="mt-6 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-cream/30">
              <span className="grid size-8 place-items-center border border-white/12">
                <Plus className="size-3 text-gold" />
              </span>
              Tap an image to enlarge
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-3 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={50 + (index % 3) * 60}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${item.label} image larger`}
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-charcoal text-left"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute left-4 top-4 font-display text-[11px] tracking-[0.14em] text-cream/50 sm:left-5 sm:top-5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="absolute right-3 top-3 grid size-9 place-items-center border border-cream/25 bg-ink/25 text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:right-5 sm:top-5">
                  <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
                </span>

                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 border-t border-cream/25 pt-3.5 sm:inset-x-5 sm:bottom-5 sm:pt-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-cream sm:text-[10px]">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-1.5 rotate-45 bg-gold"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cream/28">
            Precision · Grooming · Detail
          </p>
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
          >
            Book your look
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>

      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.label} — enlarged gallery image`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/96 p-4 backdrop-blur-md sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setActiveIndex(null)}
            className="fixed right-4 top-4 z-20 grid size-11 place-items-center border border-cream/20 bg-ink/50 text-cream transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
            aria-label="Close gallery"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex(
                (activeIndex - 1 + gallery.length) % gallery.length,
              )
            }
            className="absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center border border-cream/20 bg-ink/50 text-cream transition-colors hover:border-gold hover:text-gold sm:left-6 sm:size-12"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>

          <div className="relative flex max-h-full w-full max-w-3xl flex-col items-center">
            <div className="relative max-h-[78svh] overflow-hidden">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={900}
                height={1125}
                unoptimized
                className="max-h-[78svh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.18em]">
              <span className="text-gold">{activeItem.label}</span>
              <span className="text-cream/35">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex + 1) % gallery.length)
            }
            className="absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center border border-cream/20 bg-ink/50 text-cream transition-colors hover:border-gold hover:text-gold sm:right-6 sm:size-12"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
