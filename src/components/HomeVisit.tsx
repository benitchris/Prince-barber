import Image from "next/image";
import { ArrowUpRight, Home, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BookingTrigger } from "@/components/BookingTrigger";
import { asset } from "@/lib/asset";

const steps = [
  {
    number: "01",
    title: "Pick your service",
    copy: "Choose your cut, beard work, or the full reset.",
  },
  {
    number: "02",
    title: "Choose home visit",
    copy: "Share your date, time, and location on WhatsApp.",
  },
  {
    number: "03",
    title: "We bring the chair",
    copy: "Your barber arrives ready — you just take a seat.",
  },
];

export function HomeVisit() {
  return (
    <section
      id="home-visits"
      className="relative overflow-hidden bg-sand text-ink"
    >
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[380px] overflow-hidden sm:min-h-[520px] lg:min-h-full">
          <Image
            src={asset("/images/gallery/home-visit.jpg")}
            alt="A Prince Barber barber giving a precision haircut during a home visit."
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2.5 bg-ink px-4 py-3 text-cream sm:left-6 sm:top-6">
            <Home className="size-3.5 text-gold" strokeWidth={1.5} />
            <span className="text-[8px] font-extrabold uppercase tracking-[0.22em]">
              Home service
            </span>
          </div>

          <div className="absolute bottom-4 right-4 border border-ink/10 bg-gold px-5 py-4 text-ink sm:bottom-6 sm:right-6">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/50">
              Home visits
            </p>
            <p className="mt-1 font-display text-2xl leading-none tracking-[0.04em]">
              KES {siteConfig.homeVisit.price.toLocaleString("en-KE")}
            </p>
          </div>
        </Reveal>

        <div className="relative flex items-center px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-20 size-72 rounded-full border border-gold-dark/10"
          />
          <div className="relative w-full max-w-xl">
            <Reveal>
              <SectionLabel index="/ 03" tone="dark">
                The chair travels
              </SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-6 display-heading text-[clamp(3.2rem,6vw,5.8rem)] text-ink">
                We come
                <br />
                <span className="accent-italic text-gold-dark">to you.</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-lg text-sm leading-7 text-ink/62 sm:text-[15px] sm:leading-8">
                A sharp cut shouldn&apos;t have to compete with a busy day. Prince
                Barber brings the full experience to your home or office — the
                same precision, care, and clean finish, at the same flat rate.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-0 border-t border-ink/15 sm:mt-12">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={200 + index * 70}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/15 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
                    <span className="font-display text-xs tracking-[0.12em] text-gold-dark">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-6 text-ink/50">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420}>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <BookingTrigger
                  visitType="home"
                  className="group inline-flex items-center justify-center gap-3 bg-ink px-7 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-charcoal sm:px-8"
                >
                  Arrange a home visit
                  <ArrowUpRight
                    className="size-4 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </BookingTrigger>
                <p className="flex items-center gap-2 text-[9px] font-bold uppercase leading-5 tracking-[0.12em] text-ink/40">
                  <MapPin className="size-3.5 shrink-0 text-gold-dark" />
                  Availability confirmed when you book
                </p>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <p className="mt-7 max-w-lg border-l border-gold-dark/40 pl-4 text-[10px] leading-5 text-ink/42">
                {siteConfig.homeVisit.note}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
