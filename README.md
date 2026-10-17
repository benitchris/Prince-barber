# Prince Barber

A premium, mobile-first website for **Prince Barber** — a barbershop and mobile
grooming service. Built with Next.js, TypeScript, and Tailwind CSS, and exported
as a fully static site for GitHub Pages.

## What's included

- Full-screen editorial hero with the Prince Barber identity
- About section focused on precision, personal style, and service
- Six service cards at **KES 1,500** each, with an editable price config
- Dedicated **home visit** section — “the chair comes to you”
- Six-image gallery with keyboard-accessible lightbox
- Testimonial placeholders ready for real reviews and client photos
- WhatsApp booking flow with prefilled name, phone, service, visit type,
  location (for home visits), date, and time
- Salon contact, opening hours, phone display, and map placeholders
- Responsive layouts, reduced-motion support, and accessible navigation

There is **no backend**. The site is statically exported and the booking form
hands off to WhatsApp. A booking is never marked as confirmed by the website;
it is confirmed once the barber replies on WhatsApp.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create the production static export:

```bash
npm run build
```

The static output is written to `out/`. Preview it with any static file server:

```bash
python3 -m http.server 8080 --directory out
```

## Edit the business details

Everything business-specific lives in one file:

### [`src/config/site.ts`](src/config/site.ts)

### 1. WhatsApp booking number — required

Find this field near the top of the config:

```ts
whatsappNumber: "254XXXXXXXXX",
```

Replace it with the salon's WhatsApp number in **international format, digits
only**:

```ts
whatsappNumber: "254712345678",
```

No `+`, spaces, brackets, or leading zero. This is the single place the booking
number needs to be changed. Until a valid number is entered, the form validates
the details and then shows an honest “booking isn't connected yet” message
instead of pretending to send.

### 2. Contact placeholders

Update the sample values before launch:

- `phoneDisplay`
- `openingHours`
- `address.line1` and `address.line2`
- `mapUrl` (paste the salon's Google Maps link)
- `contactDetailsArePlaceholders` — set to `false` after replacing the samples
  to remove the setup note from the website.

### 3. Prices

All six services are currently **KES 1,500**, as requested. Prices are set per
service in the `services` array, so they can be changed individually. The home
visit price is in `homeVisit.price`. Currency labels use `pricing.currency`.

The `pricing.note` text under the service grid can also be edited there.

### 4. Services

Edit `name`, `description`, and `price` in the `services` array. The optional
`featured: true` flag gives one service the gold “Signature service” card.
Icons are assigned by service id in `src/components/Services.tsx`.

### 5. Gallery

Drop replacement photos into `public/images/gallery/` and update the `gallery`
array in `src/config/site.ts` with the file path, alt text, and caption. Keep a
vertical 4:5 crop for the uniform gallery layout.

Current sample image paths:

```
public/images/hero.jpg
public/images/about.jpg
public/images/gallery/fade.jpg
public/images/gallery/beard.jpg
public/images/gallery/classic.jpg
public/images/gallery/interior.jpg
public/images/gallery/home-visit.jpg
public/images/gallery/styling.jpg
```

All sample imagery is generated placeholder photography. Replace it with real
salon photos for launch.

### 6. Testimonials

The testimonial section currently renders three clearly marked placeholder
cards. Add real reviews to the `testimonials` array in
`src/config/site.ts`:

```ts
export const testimonials = [
  {
    name: "Client name",
    quote: "Their real review goes here.",
    service: "Skin Fade",
    image: "/images/testimonials/client-1.jpg", // optional
  },
];
```

Put client photos in `public/images/testimonials/`. Only add genuine reviews.
When the array is empty, the placeholders are shown automatically.

## Deploy to GitHub Pages

The included workflow at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys the static export automatically.

1. Push the site to the `main` branch of
   [`benitchris/Prince-barber`](https://github.com/benitchris/Prince-barber).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Run the workflow from the **Actions** tab, or push a new commit to `main`.

For a project site, the expected address is:

```
https://benitchris.github.io/Prince-barber/
```

The workflow reads GitHub Pages' `base_path` and `origin` outputs, so assets and
links work from that subpath automatically. For a custom domain, GitHub Pages
reports an empty base path and the same workflow continues to work.

To reproduce a project-site build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/Prince-barber \
NEXT_PUBLIC_SITE_URL=https://benitchris.github.io \
npm run build
```

## Project structure

```
src/
  app/            Page shell, metadata, global styles, favicon
  components/     Page sections and interactive UI
  config/site.ts  All business content, contact details, prices, media
  lib/            Small utilities
public/images/    Optimized local photography
```

## Tech notes

- Next.js App Router with `output: "export"`
- No API routes, server actions, or runtime server dependencies
- `images.unoptimized` is enabled because Next.js image optimization requires a
  server; photography is pre-cropped and compressed locally instead
- Local font files via Fontsource — no third-party font requests at runtime
- Lucide icons
- Testimonials and contact details are intentionally placeholders; add only
  confirmed business information before going live
