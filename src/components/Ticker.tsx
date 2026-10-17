const words = [
  "Precision fades",
  "Beard sculpting",
  "Classic cuts",
  "Home visits",
  "Kids' cuts",
  "Wash & styling",
];

function TickerGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((word) => (
        <div key={word} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl uppercase tracking-[0.18em] sm:px-8 sm:text-2xl">
            {word}
          </span>
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 bg-gold-dark/80"
          />
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-black/10 bg-cream py-3.5 text-ink">
      <p className="sr-only">
        Prince Barber services: precision fades, beard sculpting, classic cuts,
        home visits, kids&apos; cuts, wash and styling.
      </p>
      <div aria-hidden="true" className="flex w-max animate-marquee">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
