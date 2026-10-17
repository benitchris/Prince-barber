"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Store,
} from "lucide-react";
import {
  bookingTimes,
  services,
  siteConfig,
} from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

type VisitType = "salon" | "home";

type BookingForm = {
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  visitType: VisitType;
  address: string;
};

type BookingIntent = {
  serviceId?: string;
  visitType?: VisitType;
};

const initialForm: BookingForm = {
  name: "",
  phone: "",
  serviceId: services[0]?.id ?? "",
  date: "",
  time: "",
  visitType: "salon",
  address: "",
};

function formatPreferredDate(value: string) {
  if (!value) return "Date to be confirmed";

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day, 12));
}

const cleanedWhatsAppNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
const isWhatsAppConfigured = /^\d{9,15}$/.test(cleanedWhatsAppNumber);

const phoneIsPlaceholder = /x/i.test(siteConfig.phoneDisplay);
const cleanedPhone = siteConfig.phoneDisplay.replace(/[^\d+]/g, "");

export function Booking() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [minDate, setMinDate] = useState("");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const selectedService = useMemo(
    () =>
      services.find((service) => service.id === form.serviceId) ??
      services[0],
    [form.serviceId],
  );

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60_000,
    )
      .toISOString()
      .slice(0, 10);
    setMinDate(localDate);
  }, []);

  useEffect(() => {
    const onBookingIntent = (event: Event) => {
      const detail = (event as CustomEvent<BookingIntent>).detail;
      if (!detail) return;

      setForm((current) => ({
        ...current,
        ...(detail.serviceId &&
        services.some((service) => service.id === detail.serviceId)
          ? { serviceId: detail.serviceId }
          : {}),
        ...(detail.visitType ? { visitType: detail.visitType } : {}),
      }));
      setError("");
      setWhatsappUrl("");
    };

    window.addEventListener("prince:booking-intent", onBookingIntent);
    return () =>
      window.removeEventListener("prince:booking-intent", onBookingIntent);
  }, []);

  const update = <Key extends keyof BookingForm>(
    key: Key,
    value: BookingForm[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setWhatsappUrl("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setWhatsappUrl("");

    if (form.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number so the barber can reach you.");
      return;
    }

    if (minDate && form.date < minDate) {
      setError("Please choose today or a future date.");
      return;
    }

    if (!isWhatsAppConfigured) {
      setError(
        "Online WhatsApp booking isn't connected yet. Please check back soon or contact the salon directly.",
      );
      return;
    }

    const isHomeVisit = form.visitType === "home";
    const message = [
      "Hello Prince Barber, I'd like to request an appointment.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Service: ${selectedService.name} — KES ${selectedService.price.toLocaleString("en-KE")}`,
      `Appointment: ${isHomeVisit ? "Home visit" : "In the studio"}`,
      ...(isHomeVisit ? [`Location: ${form.address.trim()}`] : []),
      `Preferred date: ${formatPreferredDate(form.date)}`,
      `Preferred time: ${form.time}`,
      "",
      "Please confirm availability. Thank you.",
    ].join("\n");

    const url = `https://wa.me/${cleanedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setWhatsappUrl(url);
  };

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] translate-x-1/3 rounded-full bg-gold/[0.055] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="/ 06">Book your chair</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-7 display-heading text-[clamp(3.2rem,7vw,6.4rem)] text-cream">
                Take the chair.
                <br />
                <span className="accent-italic text-gold">
                  We&apos;ll do the rest.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-[13px] leading-7 text-cream/48 sm:text-sm">
              Share your details and the booking opens in WhatsApp, ready to
              send. Your appointment is confirmed once the barber replies.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:mt-16 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-5">
            <aside className="relative flex h-full flex-col overflow-hidden bg-gold p-6 text-ink sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-ink/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-56 rounded-full border border-ink/10"
              />

              <p className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.24em] text-ink/55">
                <span className="h-px w-6 bg-ink/30" />
                Salon details
              </p>
              <h3 className="mt-4 font-display text-[2.5rem] uppercase leading-none tracking-[0.025em] sm:text-5xl">
                Find the chair.
              </h3>

              <div className="mt-9 space-y-7">
                <div className="flex gap-3.5">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-ink/60"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/45">
                      Studio
                    </p>
                    <address className="mt-1.5 text-[13px] font-semibold not-italic leading-6 text-ink/85">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                    </address>
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-2 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/55 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
                    >
                      {siteConfig.mapLinkLabel}
                      <ArrowUpRight
                        className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>
                </div>

                <div className="border-t border-ink/15 pt-6">
                  <div className="flex gap-3.5">
                    <Clock3
                      className="mt-0.5 size-4 shrink-0 text-ink/60"
                      strokeWidth={1.6}
                    />
                    <div className="w-full">
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/45">
                        Opening hours
                      </p>
                      <dl className="mt-2.5 space-y-2">
                        {siteConfig.openingHours.map((entry) => (
                          <div
                            key={entry.days}
                            className="flex items-baseline justify-between gap-5 text-[11px]"
                          >
                            <dt className="font-medium text-ink/65">
                              {entry.days}
                            </dt>
                            <dd className="font-semibold text-ink/85">
                              {entry.hours}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="border-t border-ink/15 pt-6">
                  <div className="flex gap-3.5">
                    <Phone
                      className="mt-0.5 size-4 shrink-0 text-ink/60"
                      strokeWidth={1.6}
                    />
                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/45">
                        Talk to us
                      </p>
                      {phoneIsPlaceholder ? (
                        <p className="mt-1.5 text-[13px] font-semibold text-ink/85">
                          {siteConfig.phoneDisplay}
                        </p>
                      ) : (
                        <a
                          href={`tel:${cleanedPhone}`}
                          className="mt-1.5 inline-block text-[13px] font-semibold text-ink/85 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
                        >
                          {siteConfig.phoneDisplay}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-ink/15 pt-6">
                  <div className="flex gap-3.5">
                    <Home
                      className="mt-0.5 size-4 shrink-0 text-ink/60"
                      strokeWidth={1.6}
                    />
                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-ink/45">
                        Home visits
                      </p>
                      <p className="mt-1.5 text-[13px] font-semibold leading-6 text-ink/85">
                        KES {siteConfig.homeVisit.price.toLocaleString("en-KE")}{" "}
                        — by appointment
                      </p>
                      <p className="mt-1 text-[10px] leading-5 text-ink/50">
                        Choose &ldquo;Home visit&rdquo; in the form and share
                        your location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {siteConfig.contactDetailsArePlaceholders && (
                <div className="mt-auto pt-8">
                  <p className="border-t border-ink/15 pt-4 text-[9px] leading-4 text-ink/40">
                    Sample contact details — update them in{" "}
                    <span className="font-bold">src/config/site.ts</span> before
                    launch.
                  </p>
                </div>
              )}
            </aside>
          </Reveal>

          <Reveal delay={100} className="h-full lg:col-span-7">
            <div className="h-full border border-white/10 bg-[#11100d] p-6 sm:p-9 lg:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">
                    Appointment request
                  </p>
                  <h3 className="mt-2.5 font-display text-[2.4rem] uppercase leading-none tracking-[0.025em] text-cream sm:text-[2.8rem]">
                    Book your cut
                  </h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 border border-gold/25 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.16em] text-gold/80">
                  <MessageCircle className="size-3.5" strokeWidth={1.7} />
                  WhatsApp
                </span>
              </div>

              <p className="mt-4 max-w-lg text-xs leading-6 text-cream/42">
                No account needed. Fill this in and we&apos;ll prepare a
                WhatsApp message with every detail for you to review and send.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-name" className="field-label">
                      Full name <span className="required">*</span>
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      placeholder="Your full name"
                      className="field"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="field-label">
                      Phone number <span className="required">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="07XX XXX XXX"
                      className="field"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <fieldset>
                      <legend className="field-label">
                        Appointment type
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          aria-pressed={form.visitType === "salon"}
                          onClick={() => update("visitType", "salon")}
                          className={cn(
                            "flex items-center justify-center gap-2 border px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors duration-200",
                            form.visitType === "salon"
                              ? "border-gold bg-gold text-ink"
                              : "border-white/12 bg-white/[0.02] text-cream/50 hover:border-gold/40 hover:text-cream/80",
                          )}
                        >
                          <Store className="size-3.5" strokeWidth={1.6} />
                          In the studio
                        </button>
                        <button
                          type="button"
                          aria-pressed={form.visitType === "home"}
                          onClick={() => update("visitType", "home")}
                          className={cn(
                            "flex items-center justify-center gap-2 border px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors duration-200",
                            form.visitType === "home"
                              ? "border-gold bg-gold text-ink"
                              : "border-white/12 bg-white/[0.02] text-cream/50 hover:border-gold/40 hover:text-cream/80",
                          )}
                        >
                          <Home className="size-3.5" strokeWidth={1.6} />
                          Home visit
                        </button>
                      </div>
                    </fieldset>
                  </div>

                  {form.visitType === "home" && (
                    <div className="sm:col-span-2">
                      <label htmlFor="booking-address" className="field-label">
                        Home address / area{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="booking-address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        required
                        value={form.address}
                        onChange={(event) =>
                          update("address", event.target.value)
                        }
                        placeholder="Estate, street, or building"
                        className="field"
                      />
                      <p className="mt-2 text-[10px] leading-5 text-cream/30">
                        Availability and travel details are confirmed on
                        WhatsApp.
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="booking-service" className="field-label">
                      Service <span className="required">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="booking-service"
                        name="service"
                        required
                        value={form.serviceId}
                        onChange={(event) =>
                          update("serviceId", event.target.value)
                        }
                        className="field appearance-none pr-10"
                      >
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} — KES{" "}
                            {service.price.toLocaleString("en-KE")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-cream/35"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-date" className="field-label">
                      Preferred date <span className="required">*</span>
                    </label>
                    <input
                      id="booking-date"
                      name="date"
                      type="date"
                      required
                      min={minDate || undefined}
                      value={form.date}
                      onChange={(event) => update("date", event.target.value)}
                      className="field"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-time" className="field-label">
                      Preferred time <span className="required">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="booking-time"
                        name="time"
                        required
                        value={form.time}
                        onChange={(event) => update("time", event.target.value)}
                        className="field appearance-none pr-10"
                      >
                        <option value="" disabled>
                          Choose a time
                        </option>
                        {bookingTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-cream/35"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>

                  <div className="hidden sm:block" aria-hidden="true" />
                </div>

                <div className="mt-7 flex items-center justify-between gap-6 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-cream/28">
                      Selected
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-cream/70">
                      {selectedService.name} ·{" "}
                      {form.visitType === "home" ? "Home visit" : "In studio"}
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-display text-2xl leading-none tracking-[0.03em] text-gold">
                    <span className="mr-1.5 font-sans text-[8px] font-bold tracking-[0.12em]">
                      KES
                    </span>
                    {selectedService.price.toLocaleString("en-KE")}
                  </p>
                </div>

                <div aria-live="polite">
                  {error && (
                    <div
                      role="alert"
                      className="mt-5 border border-red-300/25 bg-red-400/[0.06] px-4 py-3 text-[11px] leading-5 text-red-100/85"
                    >
                      {error}
                    </div>
                  )}

                  {whatsappUrl && (
                    <div className="mt-5 flex gap-3 border border-gold/25 bg-gold/[0.05] px-4 py-3.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        strokeWidth={1.8}
                      />
                      <div className="text-[11px] leading-5 text-cream/65">
                        <p className="font-semibold text-cream/85">
                          WhatsApp is opening in a new tab.
                        </p>
                        <p className="mt-0.5">
                          Send the message to request your appointment.{" "}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gold underline decoration-gold/35 underline-offset-2"
                          >
                            Open it again
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  aria-describedby="booking-form-note"
                  className="group mt-5 flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-gold-light"
                >
                  Continue on WhatsApp
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </button>

                <p
                  id="booking-form-note"
                  className="mt-3.5 text-center text-[9px] leading-4 text-cream/28"
                >
                  Opens WhatsApp with your details ready to send. No payment is
                  taken online.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 hidden select-none opacity-[0.035] xl:block"
      >
        <Image
          src="/images/gallery/fade.jpg"
          alt=""
          width={864}
          height={1080}
          unoptimized
          className="h-[620px] w-auto object-cover"
        />
      </div>
    </section>
  );
}
