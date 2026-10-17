"use client";

import type { ReactNode } from "react";

type BookingTriggerProps = {
  children: ReactNode;
  className?: string;
  serviceId?: string;
  visitType?: "salon" | "home";
  ariaLabel?: string;
};

/**
 * Sends a small in-page intent to the booking form, then lets the browser
 * scroll to #booking. No data leaves the browser.
 */
export function BookingTrigger({
  children,
  className,
  serviceId,
  visitType,
  ariaLabel,
}: BookingTriggerProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("prince:booking-intent", {
        detail: { serviceId, visitType },
      }),
    );
  };

  return (
    <a
      href="#booking"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
