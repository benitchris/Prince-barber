/**
 * PRINCE BARBER — SITE CONTENT
 * ----------------------------------------------------------------------------
 * This is the single source of truth for business details, pricing, services,
 * gallery images, and booking information.
 *
 * BEFORE LAUNCH:
 * 1. Add the salon's WhatsApp number below in international format, digits only
 *    (for example: 254712345678 — no "+", spaces, or leading zero).
 * 2. Replace the sample address, phone display, opening hours, and map link.
 * 3. Replace the gallery and testimonial placeholders with real photography.
 * 4. Set `contactDetailsArePlaceholders` to false to hide the setup note.
 */

export const siteConfig = {
  name: "Prince Barber",
  tagline: "Sharp Cuts. Clean Style. Your Confidence.",
  description:
    "A modern barbershop experience built on precision, personal style, and genuine care — in the chair or at your door.",

  /**
   * WHATSAPP BOOKING NUMBER — the only place it needs to be changed.
   * International format, digits only. No "+", brackets, or spaces.
   * Leave as "254XXXXXXXXX" to keep booking in setup mode.
   */
  whatsappNumber: "254XXXXXXXXX",

  /** Displayed contact number. Replace with the real number before launch. */
  phoneDisplay: "+254 7XX XXX XXX",

  /** Opening hours are sample placeholders, not confirmed business details. */
  openingHours: [
    { days: "Monday — Friday", hours: "9:00 AM — 7:00 PM" },
    { days: "Saturday", hours: "9:00 AM — 7:00 PM" },
    { days: "Sunday", hours: "By appointment" },
  ],

  /** Replace all four fields with the salon's real location details. */
  address: {
    line1: "Your salon address",
    line2: "Nairobi, Kenya",
  },
  mapUrl: "https://www.google.com/maps",
  mapLinkLabel: "Open map",

  contactDetailsArePlaceholders: true,

  /** Home-service information. Pricing is in Kenyan Shillings. */
  homeVisit: {
    price: 1500,
    strapline: "The barbershop, at your door.",
    note: "Home visits are by appointment. Share your location on WhatsApp so availability and travel details can be confirmed.",
  },

  /** Set to false to remove the short note about prices being editable. */
  showPricingNote: false,
} as const;

export const pricing = {
  currency: "KES",
  note: "Flat rate per service. Home visits are also KES 1,500; availability and travel details are confirmed on WhatsApp.",
} as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  featured?: boolean;
};

/** Update names, descriptions, and individual prices here. */
export const services: Service[] = [
  {
    id: "classic-haircut",
    name: "Classic Haircut",
    description:
      "A considered consultation, precision scissor work, and a clean finish tailored to your features and routine.",
    price: 1500,
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    description:
      "Seamless gradients, crisp lines, and detailed finishing for a sharp, modern silhouette.",
    price: 1500,
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    description:
      "Shape, balance, and clean edges — finished with conditioning beard care and a little polish.",
    price: 1500,
  },
  {
    id: "haircut-beard-combo",
    name: "Haircut + Beard",
    description:
      "The complete reset: a tailored haircut paired with a sculpted, conditioned beard.",
    price: 1500,
    featured: true,
  },
  {
    id: "kids-haircut",
    name: "Kids' Haircut",
    description:
      "Patient, comfortable cuts for younger clients, with a clean style they can wear with confidence.",
    price: 1500,
  },
  {
    id: "hair-wash-styling",
    name: "Wash & Styling",
    description:
      "A refreshing wash, scalp care, and a considered finish with the right styling product.",
    price: 1500,
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

/** Replace image files in /public/images/gallery and update these captions. */
export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery/fade.jpg",
    alt: "Close-up of a crisp skin fade haircut",
    label: "Precision fade",
  },
  {
    src: "/images/gallery/beard.jpg",
    alt: "Barber shaping a client's beard with a comb and trimmer",
    label: "Beard sculpting",
  },
  {
    src: "/images/gallery/classic.jpg",
    alt: "Finished classic haircut styled with texture",
    label: "The classic",
  },
  {
    src: "/images/gallery/interior.jpg",
    alt: "Warm, dark interior of a premium barbershop",
    label: "The chair",
  },
  {
    src: "/images/gallery/home-visit.jpg",
    alt: "Barber giving a haircut to a client in their home",
    label: "At your door",
  },
  {
    src: "/images/gallery/styling.jpg",
    alt: "Barber finishing a client's haircut with styling product",
    label: "The finish",
  },
];

export type Testimonial = {
  name: string;
  quote: string;
  service?: string;
  /** Optional square photo path, e.g. "/images/testimonials/client-1.jpg". */
  image?: string;
};

/**
 * TESTIMONIAL PLACEHOLDERS
 * Add real reviews here once available. The site automatically shows polished
 * placeholder cards while this array is empty. Do not invent testimonials.
 */
export const testimonials: Testimonial[] = [];

export const bookingTimes = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
] as const;
