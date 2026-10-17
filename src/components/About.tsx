import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const principles = [
  {
    number: "01",
    title: "Precision by default",
    copy: "No rushed cuts. Every line, fade, and finish is treated as part of the whole.",
  },
  {
    number: "02",
    title: "Style, made personal",
    copy: "Your face, hair, and routine shape the cut — never the other way around.",
  },
  {
    number: "03",
    title: "We come to you",
    copy: "Book the chair, or have the full barbering experience brought to your door.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[34rem] rounded-full bg-gold/[0.045] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20 xl:gap-24">
          <Reveal className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-[500px]">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-full w-full border border-gold/25 sm:-left-5 sm:-top-5"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <Image
                  src="/images/about.jpg"
                  alt="A Prince Barber barber in a black apron holding professional clippers."
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-center transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/15 bg-ink/65 px-5 py-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:min-w-[250px]">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-gold">
                      The standard
                    </p>
                    <p className="mt-1.5 font-display text-[1.35rem] uppercase leading-none tracking-[0.04em] text-cream">
                      At the chair. Or at yours.
                    </p>
                  </div>
                  <ArrowUpRight
                    className="ml-6 size-5 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                </div>
              </div>
              <p className="mt-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-cream/28">
                <span className="h-px w-6 bg-cream/20" />
                Prince Barber · The house
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={80}>
              <SectionLabel index="/ 01">About the house</SectionLabel>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="mt-7 display-heading text-[clamp(3rem,6.4vw,5.9rem)] text-cream">
                Sharp isn&apos;t extra.
                <br />
                <span className="accent-italic text-gold">
                  It&apos;s the standard.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 max-w-xl space-y-5 text-[14px] leading-7 text-cream/58 sm:text-[15px] sm:leading-8">
                <p>
                  Prince Barber is a modern grooming house built around quality
                  haircuts, personal style, and genuine care. Every appointment
                  begins with a conversation and ends with a look made for you.
                </p>
                <p>
                  From clean classics to razor-sharp fades, the details matter.
                  In the studio or at your home, the standard stays the same:
                  take your time, listen closely, and send you out sharper than
                  you arrived.
                </p>
              </div>
            </Reveal>

            <div className="mt-11 border-t border-white/10">
              {principles.map((principle, index) => (
                <Reveal key={principle.number} delay={260 + index * 70}>
                  <div className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-6 sm:grid-cols-[3.5rem_0.9fr_1.1fr] sm:items-baseline sm:gap-6">
                    <span className="font-display text-xs tracking-[0.12em] text-gold/60">
                      {principle.number}
                    </span>
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-cream transition-colors group-hover:text-gold sm:text-xs">
                      {principle.title}
                    </h3>
                    <p className="col-span-2 text-xs leading-6 text-cream/42 sm:col-span-1 sm:text-[13px]">
                      {principle.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={480}>
              <a
                href="#services"
                className="group mt-10 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cream transition-colors hover:text-gold"
              >
                Discover the menu
                <span className="grid size-9 place-items-center border border-cream/20 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
