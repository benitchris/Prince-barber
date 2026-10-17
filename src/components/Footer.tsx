import {
  ArrowUp,
  ArrowUpRight,
  Clock3,
  Home,
  MapPin,
} from "lucide-react";
import { services, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

const exploreLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Home visits", href: "#home-visits" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book now", href: "#booking" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080705]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-5">
            <Logo />
            <p className="mt-7 max-w-sm text-[13px] leading-7 text-cream/42">
              Precision barbering, considered grooming, and the confidence that
              comes with a proper finish. In the studio, or at your door.
            </p>
            <a
              href="#booking"
              className="group mt-8 inline-flex items-center gap-3 border-b border-gold/40 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:text-gold-light"
            >
              Book an appointment
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </a>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[11px] tracking-[0.03em] text-cream/48 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[11px] tracking-[0.03em] text-cream/48 transition-colors hover:text-cream"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold">
              Visit
            </h2>
            <ul className="mt-5 space-y-5 text-[11px] leading-5 text-cream/48">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 size-3.5 shrink-0 text-gold/65"
                  strokeWidth={1.5}
                />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock3
                  className="mt-0.5 size-3.5 shrink-0 text-gold/65"
                  strokeWidth={1.5}
                />
                <span>
                  {siteConfig.openingHours[0].days}
                  <br />
                  {siteConfig.openingHours[0].hours}
                </span>
              </li>
              <li className="flex gap-3">
                <Home
                  className="mt-0.5 size-3.5 shrink-0 text-gold/65"
                  strokeWidth={1.5}
                />
                <span>
                  Home visits by appointment
                  <br />
                  <span className="text-cream/32">
                    KES {siteConfig.homeVisit.price.toLocaleString("en-KE")}
                  </span>
                </span>
              </li>
            </ul>
            <p className="mt-6 text-[11px] text-cream/48">
              {siteConfig.phoneDisplay}
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="mx-auto max-w-[1440px] overflow-hidden px-5 pt-8 sm:px-8 lg:px-12">
          <p
            aria-hidden="true"
            className="select-none whitespace-nowrap text-center font-display text-[clamp(3.25rem,14vw,12.5rem)] uppercase leading-[0.7] tracking-[0.005em] text-stroke-cream"
          >
            Prince Barber
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.16em] text-cream/25">
            © {year} Prince Barber. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[9px] uppercase tracking-[0.16em] text-cream/20">
              Sharp cuts. Clean style.
            </p>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid size-9 place-items-center border border-white/12 text-cream/45 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp className="size-3.5" strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
