import Image from "next/image";
import { ArrowUpRight, Quote, Star, UserRound } from "lucide-react";
import { testimonials } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

function StarRow() {
  return (
    <div
      className="flex gap-1.5 text-gold/45"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-3" strokeWidth={1.25} />
      ))}
    </div>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <article className="relative flex h-full flex-col border border-white/10 bg-white/[0.018] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <Quote className="size-7 text-gold/35" strokeWidth={1.2} />
        <span className="font-display text-[10px] tracking-[0.14em] text-cream/20">
          0{index + 1}
        </span>
      </div>

      <div className="mt-8 space-y-3" aria-hidden="true">
        <div className="h-2 w-full bg-white/[0.07]" />
        <div className="h-2 w-[88%] bg-white/[0.06]" />
        <div className="h-2 w-[62%] bg-white/[0.05]" />
      </div>

      <p className="mt-7 font-serif text-xl italic leading-snug text-cream/28">
        A real client story belongs here.
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3.5">
          <span className="grid size-11 place-items-center rounded-full border border-dashed border-gold/30 bg-gold/[0.03]">
            <UserRound
              className="size-4 text-gold/45"
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/38">
              Client review
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-cream/20">
              Photo &amp; story coming soon
            </p>
          </div>
        </div>
        <StarRow />
      </div>
    </article>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <article className="flex h-full flex-col border border-white/10 bg-white/[0.018] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <Quote className="size-7 text-gold/65" strokeWidth={1.2} />
        <span className="font-display text-[10px] tracking-[0.14em] text-cream/20">
          0{index + 1}
        </span>
      </div>
      <blockquote className="mt-8 font-serif text-[1.65rem] italic leading-[1.25] text-cream/82">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="mt-auto flex items-center gap-3.5 border-t border-white/10 pt-6">
        {review.image ? (
          <span className="relative size-11 overflow-hidden rounded-full border border-gold/40">
            <Image
              src={review.image}
              alt=""
              fill
              unoptimized
              sizes="44px"
              className="object-cover"
            />
          </span>
        ) : (
          <span className="grid size-11 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm text-gold">
            {review.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cream">
            {review.name}
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-cream/30">
            {review.service ?? "Prince Barber client"}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-charcoal py-24 sm:py-32 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-1/2 size-[32rem] -translate-y-1/2 rounded-full bg-gold/[0.035] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="/ 05">Client words</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-7 display-heading text-[clamp(3.2rem,7vw,6.4rem)] text-cream">
                In their
                <span className="accent-italic ml-4 text-gold">words.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-[13px] leading-7 text-cream/48 sm:text-sm">
              The best measure of a cut is how it makes you feel. Real client
              stories and photos will be added here.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {hasReviews
            ? testimonials.slice(0, 3).map((review, index) => (
                <Reveal key={`${review.name}-${index}`} delay={index * 70}>
                  <ReviewCard review={review} index={index} />
                </Reveal>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Reveal key={index} delay={index * 70}>
                  <PlaceholderCard index={index} />
                </Reveal>
              ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cream/26">
              {hasReviews
                ? "Words from the chair"
                : "Testimonial placeholders · awaiting real reviews"}
            </p>
            <a
              href="#booking"
              className="group inline-flex items-center gap-2 self-start text-[9px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light sm:self-auto"
            >
              Your chair is waiting
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
