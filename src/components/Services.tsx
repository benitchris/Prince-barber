import {
  ArrowUpRight,
  Crown,
  Droplets,
  Feather,
  Layers,
  Scissors,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { pricing, services, type Service } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BookingTrigger } from "@/components/BookingTrigger";
import { cn } from "@/lib/cn";

const iconById: Record<string, LucideIcon> = {
  "classic-haircut": Scissors,
  "skin-fade": Layers,
  "beard-trim": Feather,
  "haircut-beard-combo": Crown,
  "kids-haircut": Smile,
  "hair-wash-styling": Droplets,
};

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = iconById[service.id] ?? Sparkles;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border p-6 transition-all duration-500 sm:p-7",
        service.featured
          ? "border-gold bg-gold text-ink"
          : "border-white/10 bg-[#11100d] text-cream hover:-translate-y-1 hover:border-gold/55 hover:bg-[#15130f]",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-display text-xs tracking-[0.12em]",
            service.featured ? "text-ink/45" : "text-cream/28",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon
          className={cn(
            "size-5 transition-transform duration-500 group-hover:rotate-6",
            service.featured ? "text-ink/70" : "text-gold",
          )}
          strokeWidth={1.35}
          aria-hidden="true"
        />
      </div>

      {service.featured && (
        <p className="mt-5 inline-flex w-fit border border-ink/20 px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/70">
          Signature service
        </p>
      )}

      <h3
        className={cn(
          "mt-9 font-display text-[2rem] uppercase leading-none tracking-[0.035em] sm:text-[2.25rem]",
          service.featured ? "text-ink" : "text-cream",
          service.featured && "!mt-5",
        )}
      >
        {service.name}
      </h3>
      <p
        className={cn(
          "mt-4 text-[13px] leading-6",
          service.featured ? "text-ink/68" : "text-cream/46",
        )}
      >
        {service.description}
      </p>

      <div
        className={cn(
          "mt-auto flex items-end justify-between gap-4 border-t pt-6",
          service.featured ? "border-ink/20" : "border-white/10",
          !service.featured && "mt-9",
        )}
      >
        <div>
          <p
            className={cn(
              "text-[8px] font-bold uppercase tracking-[0.2em]",
              service.featured ? "text-ink/45" : "text-cream/25",
            )}
          >
            Flat rate
          </p>
          <p
            className={cn(
              "mt-1.5 font-display text-[1.9rem] leading-none tracking-[0.03em]",
              service.featured ? "text-ink" : "text-gold",
            )}
          >
            <span className="mr-1.5 font-sans text-[9px] font-extrabold tracking-[0.14em]">
              {pricing.currency}
            </span>
            {service.price.toLocaleString("en-KE")}
          </p>
        </div>

        <BookingTrigger
          serviceId={service.id}
          ariaLabel={`Book ${service.name}`}
          className={cn(
            "group/cta flex size-10 shrink-0 items-center justify-center border transition-all duration-300",
            service.featured
              ? "border-ink/25 text-ink hover:bg-ink hover:text-gold"
              : "border-white/15 text-cream/60 hover:border-gold hover:bg-gold hover:text-ink",
          )}
        >
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            strokeWidth={1.7}
          />
        </BookingTrigger>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-coal py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(241,234,223,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(241,234,223,0.7)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="/ 02">Services &amp; pricing</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-7 display-heading text-[clamp(3.2rem,7vw,6.4rem)] text-cream">
                Your look,
                <br />
                <span className="accent-italic text-gold">perfected.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-[13px] leading-7 text-cream/48 sm:text-sm">
              Classic discipline with a modern finish. Choose the service you
              need — every appointment gets the same unhurried attention and
              detailed finish.
            </p>
            <div className="mt-7 flex items-baseline gap-3 border-t border-white/10 pt-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cream/30">
                Every service
              </span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="font-display text-[1.6rem] leading-none text-gold">
                KES 1,500
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:mt-16 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={80 + (index % 3) * 60}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] uppercase leading-5 tracking-[0.12em] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl normal-case tracking-normal">
              {pricing.note}
            </p>
            <span className="inline-flex items-center gap-2 whitespace-nowrap font-bold uppercase tracking-[0.16em] text-gold/75">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Finished with care
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
