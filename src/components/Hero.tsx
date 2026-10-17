import Image from "next/image";
import { ArrowDown, ArrowUpRight, Home } from "lucide-react";
import { siteConfig } from "@/config/site";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <Image
        src={asset("/images/hero.jpg")}
        alt="A barber giving a precision haircut in a warmly lit, black-and-gold barbershop."
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[65%_42%] sm:object-[62%_center] lg:object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,7,0.72)_0%,rgba(10,9,7,0.18)_36%,rgba(10,9,7,0.58)_72%,#0a0907_100%)] lg:bg-[linear-gradient(90deg,rgba(10,9,7,0.97)_0%,rgba(10,9,7,0.82)_36%,rgba(10,9,7,0.26)_68%,rgba(10,9,7,0.32)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,7,0.5)_0%,transparent_24%,transparent_62%,rgba(10,9,7,0.9)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-0 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        <div className="flex flex-1 flex-col justify-center pb-16 lg:pb-24">
          <div className="max-w-[860px]">
            <div
              className="hero-enter flex items-center gap-4"
              style={{ animationDelay: "80ms" }}
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold" />
              <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-gold sm:text-[10px]">
                Barbershop &amp; mobile grooming
              </p>
            </div>

            <h1
              className="hero-enter mt-7 font-display uppercase leading-[0.8] tracking-[0.005em]"
              style={{ animationDelay: "160ms" }}
            >
              <span className="block text-[clamp(5rem,17vw,11.75rem)] text-cream">
                Prince
              </span>
              <span className="block text-[clamp(5rem,17vw,11.75rem)] text-stroke-gold">
                Barber
              </span>
            </h1>

            <div
              className="hero-enter mt-8 flex max-w-xl items-start gap-4 border-l border-gold/70 pl-5 sm:mt-9"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-[11px] font-bold uppercase leading-5 tracking-[0.22em] text-cream sm:text-xs sm:leading-6">
                Sharp Cuts. <span className="text-gold">Clean Style.</span> Your
                Confidence.
              </p>
            </div>

            <p
              className="hero-enter mt-6 max-w-md text-sm leading-7 text-cream/62 sm:mt-7 sm:text-[15px] sm:leading-8"
              style={{ animationDelay: "360ms" }}
            >
              Precision haircuts, considered grooming, and a chair that feels
              like yours — in the studio, or brought to your door.
            </p>

            <div
              className="hero-enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "440ms" }}
            >
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-gold-light sm:px-8"
              >
                Book an appointment
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.1}
                />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-3 border border-cream/25 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-cream backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold sm:px-8"
              >
                Explore our services
                <ArrowDown
                  className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-cream/15">
          <div className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-12">
              <div className="flex items-center gap-3">
                <Home className="size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-cream/35">
                    Home visits
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-cream/85">
                    We come to you
                  </p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-cream/15 sm:block" />
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-cream/35">
                  All services
                </p>
                <p className="mt-1 text-[11px] font-semibold text-cream/85">
                  KES 1,500
                </p>
              </div>
            </div>

            <a
              href="#about"
              className="group flex items-center gap-3 self-start text-[9px] font-bold uppercase tracking-[0.22em] text-cream/45 transition-colors hover:text-gold sm:self-auto"
            >
              Scroll to discover
              <span className="grid size-9 place-items-center border border-cream/15 transition-colors group-hover:border-gold/50">
                <ArrowDown
                  className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.6}
                />
              </span>
            </a>
          </div>

          <p className="sr-only">
            {siteConfig.tagline} In-studio appointments and home visits
            available.
          </p>
        </div>
      </div>
    </section>
  );
}
