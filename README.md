# Active Island — Website

**Explore Vaavu. Live the Island.**

A premium, mobile-first marketing and booking-inquiry website for Active Island, a Vaavu Atoll (Maldives) tour specialist. Built with Next.js 14 (App Router), React, TypeScript and Tailwind CSS, per the Vaavu Atoll Tour Website brief.

This is a first, functional implementation of the homepage and core site (brief section 48: "First Implementation" — homepage and design system first, then the rest of the site built consistently from it). It is real, runnable code, not a mockup — but it ships with clearly labeled placeholder content everywhere real business data was not supplied, per the brief's content rules (section 36).

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 18.17+.

**Note on fonts:** the site loads Playfair Display and Inter via `next/font/google`, which self-hosts them at build time — this needs outbound access to Google Fonts during `npm run build`/`npm run dev` (works out of the box on Vercel, Netlify, GitHub Actions, or any normal machine/CI with internet access). This project was built and verified in a sandboxed environment with that one domain blocked, so the full production build was confirmed separately with a stubbed font loader (all 28 routes, including every tour and island page, compiled and pre-rendered with zero errors) and the real `next/font/google` layout was restored afterward — `tsc --noEmit` and `next lint` both pass clean on the final code as shipped. If your own build environment also blocks Google Fonts, swap `next/font/google` for `next/font/local` in `app/layout.tsx` with downloaded font files.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

---

## Project structure

```
app/
  layout.tsx              Root layout — fonts, global metadata, Navbar/Footer/WhatsApp button
  page.tsx                 Homepage (full 13-section flow, brief section 40)
  globals.css               Design tokens (Tailwind layer) + base styles
  sitemap.ts / robots.ts    SEO
  api/inquiry/route.ts      Stub endpoint for the booking-inquiry form (see below)
  tours/page.tsx             Tour listing
  tours/[slug]/page.tsx      Tour detail template (works for all 8 tours)
  explore-vaavu/page.tsx           Interactive Vaavu Atoll island map
  explore-vaavu/[slug]/page.tsx    Individual island page
  experiences/page.tsx       5 experience categories with anchor sections
  about/page.tsx
  contact/page.tsx           Contact details + inquiry form
  terms/, cancellation-policy/, privacy-policy/   Placeholder legal pages
  not-found.tsx

components/                Navbar, Footer, Hero, WhatsAppButton, TourCard, TourGrid,
                            ExperienceCard, QuickExperienceBar, IslandMap, Gallery,
                            Testimonials, FAQ, BookingForm, SectionHeading

data/                      tours.ts, islands.ts, faqs.ts — typed mock data, shaped to
                            match the future database tables described below

lib/constants.ts           Site-wide constants and all placeholder contact details
```

---

## Design system

- **Colors** — Ocean Deep `#073B4C`, Lagoon `#0E7490`, Island Sand `#E9D8A6`, Coral White `#FAFAF7`, Dark Text `#102A2E`, Natural Green `#426B5A`. Used sparingly: mostly white/light backgrounds, ocean tones reserved for nav, headings, buttons and key sections (brief section 7).
- **Type** — Playfair Display (headings) + Inter (body/UI), loaded via `next/font/google` as CSS variables (`--font-display`, `--font-body`), configured in `tailwind.config.ts`.
- **Motion** — subtle fade-in-up on the hero, hover/scale on cards, `prefers-reduced-motion` respected globally in `globals.css`.

---

## Placeholders to replace before launch

Every one of these is marked in code with `[BRACKETS]` or a `YOUR_...` constant so they're easy to find (`grep -rn "TO BE CONFIRMED\|\[.*\]\|YOUR_" app components data lib`).

| Item | Where |
|---|---|
| WhatsApp number | `lib/constants.ts` → `CONTACT.whatsappNumber` |
| Email address | `lib/constants.ts` → `CONTACT.email` |
| Instagram / Facebook / TikTok handles | `lib/constants.ts` → `CONTACT` |
| Domain / site URL | `lib/constants.ts` → `SITE.url` |
| Tour prices, durations, group sizes, inclusions/exclusions | `data/tours.ts` |
| Island descriptions, activities, transfer info, GPS coordinates | `data/islands.ts` |
| Island map marker positions | `components/IslandMap.tsx` — currently stylized/illustrative, **not** accurate geography |
| Weather/cancellation policy, resort-guest policy, equipment-provided FAQ answers | `data/faqs.ts`, `app/cancellation-policy/page.tsx` |
| Terms & Conditions, Privacy Policy | `app/terms/`, `app/privacy-policy/` — draft with a qualified legal professional |
| Founder/company story | `app/about/page.tsx` |
| All photography | Currently placeholder Unsplash URLs throughout `data/`, `components/Gallery.tsx`, and page heroes — replace with original Active Island photography (see `next.config.js` remotePatterns) |
| Guest reviews | `components/Testimonials.tsx` — intentionally empty; do not fabricate reviews |

No prices, phone numbers, reviews, certifications, licenses, or marine-life guarantees have been invented anywhere in this codebase, per the brief's content rules.

---

## The inquiry / booking form

`components/BookingForm.tsx` is a functional 4-step client-side form (trip info → trip details → preferences → review & send) matching brief section 24, used on both `/contact` and every tour detail page (pre-filled with that tour).

It submits to `app/api/inquiry/route.ts`, which currently **validates and logs the submission but does not yet deliver it anywhere**. Before launch, wire that route up to one of:

- An email service (Resend, Postmark, SES) to notify the Active Island team
- A database insert (see `inquiries` table shape below)
- A WhatsApp Business API notification

The success message shown to guests ("Thanks! Your Vaavu adventure request has been received…") matches the brief exactly and does not claim instant confirmation.

---

## Database / CMS preparation

`data/tours.ts` and `data/islands.ts` are typed to mirror the eventual database tables from the brief (section 30), so swapping mock arrays for real database calls later shouldn't require touching component code:

- **`tours`** — id, slug, title, category, description, duration, price, images, included/excluded, difficulty, group size, etc.
- **`islands`** — id, slug, name, description, coordinates, activities, related tours
- **`inquiries`** — the `BookingForm` payload shape, ready to be persisted once `api/inquiry/route.ts` is connected to a real database

When ready, replace the exported arrays/functions in `data/tours.ts` and `data/islands.ts` with fetch calls to your CMS or database, keeping the same `Tour` / `Island` types.

---

## SEO & accessibility

- Per-page `metadata` (or `generateMetadata` for dynamic tour/island pages), `app/sitemap.ts`, `app/robots.ts`
- `TouristTrip` structured data on tour detail pages (only fields actually known are populated)
- Semantic headings, skip-to-content link, visible focus states, `aria-*` on the mobile menu, FAQ accordion, gallery lightbox and island map
- `prefers-reduced-motion` support; no motion-sickness-inducing animation

---

## What's intentionally not built yet

Per brief section 42 ("do not overbuild initially"), the following are **out of scope for this first pass** and should be planned as follow-up work once the core site is live:

- Real payments / online checkout
- A real-time tour calendar or availability system
- Multi-language support
- The Vaavu Journal blog (architecture is compatible — add `app/blog/` following the same page pattern)
- CRM / email marketing integrations
- Google Reviews integration (Testimonials component is ready to receive real data)

---

## Suggested next documents (Active Island project)

Per the Active Island documentation system, a few companion documents would make this site fully operational:

- **AI-OPS-001** — Booking/Inquiry Handling SOP (who responds to `/api/inquiry` submissions, response-time target, escalation)
- **AI-FIN-001** — Pricing Model, to replace every `[TOUR PRICE]` placeholder
- **AI-LEGAL** — Terms, Cancellation and Privacy policies (legal review required before publishing the placeholder pages)
- **AI-BRAND-002** — Photography brief, to replace all placeholder imagery with original Active Island photography consistent with the visual direction in section 6 of the site brief
