# Al Fajr Rehab — Reusable Client-Website Template

A Next.js 14 (App Router) + TypeScript + Tailwind CSS template for small-business
client sites. **Everything that changes per client lives in one file:**
[`config/client.config.ts`](config/client.config.ts).

The example client is **Al Fajr Rehabilitation Centre**, a physiotherapy & rehab
clinic in Ras Al Khaimah, UAE. Bilingual **English / Arabic** with full **RTL**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Re-skinning for a new client

You should only ever need to touch:

1. **`config/client.config.ts`** — brand, colors, fonts, contact, hours, map, social, analytics, feature flags.
2. **`/public/brand/`** — drop in the client's `logo.svg` / `logo-light.svg` (and `favicon.svg`).
3. **`lib/i18n/dictionaries/`** — adjust reusable UI copy if needed (brand strings already come from config).
4. **`app/layout.tsx`** — only if you change the *typefaces* (the `next/font` imports).

No component edits required.

---

## Folder structure

```
alfajr-rehab/
├── app/
│   ├── layout.tsx          # Root layout: loads fonts, seeds CSS vars from config,
│   │                       #   sets <html lang/dir>, mounts LanguageProvider + GA4
│   ├── page.tsx            # Placeholder landing (real pages not built yet)
│   ├── icon.svg            # App Router favicon
│   └── globals.css         # Tailwind layers + RTL font handling + CSS vars
│
├── config/
│   └── client.config.ts    # ⭐ SINGLE SOURCE OF TRUTH (fully typed)
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts        # Locale list, default, direction (ltr/rtl), names
│   │   └── dictionaries/    # en.ts, ar.ts (typed mirror), index.ts loader
│   ├── links.ts             # tel:, mailto:, WhatsApp, Google Maps builders (from config)
│   ├── hours.ts             # "open now" logic, week ordering, time formatting
│   └── utils.ts             # cn() classname helper
│
├── components/
│   ├── index.ts             # Barrel — import { Header, Hero, … } from "@/components"
│   ├── Analytics.tsx        # GA4 (renders only if analytics.ga4Id is set)
│   ├── providers/
│   │   └── LanguageProvider.tsx   # Locale context, dir switching, t() for { en, ar }
│   ├── layout/
│   │   ├── Header.tsx        # Logo + nav + EN/AR toggle + Book CTA + mobile drawer
│   │   └── Footer.tsx        # Brand, links, contact, OpeningHours, MapEmbed, social
│   ├── ui/
│   │   ├── Hero.tsx          # Marketing hero (bg image, badge, actions slot)
│   │   ├── Section.tsx       # Generic section wrapper (eyebrow/title/subtitle/tone)
│   │   ├── CTAButton.tsx     # Polymorphic button/link, brand variants
│   │   ├── BookingCTA.tsx    # "Book Now" + "Call Now" pairing
│   │   ├── CallButton.tsx    # tap-to-call (config phone)
│   │   ├── WhatsAppFloat.tsx # Floating WhatsApp button (logical end-positioned)
│   │   ├── MapEmbed.tsx      # Keyless Google Maps embed + directions
│   │   ├── OpeningHours.tsx  # Localized weekly hours + live open/closed pill
│   │   ├── SocialLinks.tsx   # Renders config social[] with inline SVG icons
│   │   ├── LanguageToggle.tsx# EN ⇆ AR (hidden unless enableBilingual)
│   │   └── icons.tsx         # Inline SVG icon set (no icon dependency)
│   ├── cards/
│   │   ├── ServiceCard.tsx   # Service/treatment card (Localized content)
│   │   └── TeamMemberCard.tsx# Clinician profile card
│   └── forms/
│       └── AppointmentForm.tsx  # Validated, localized booking form (+ honeypot)
│
├── public/brand/            # logo.svg, logo-light.svg (+ public/favicon.svg)
├── tailwind.config.ts       # Reads colors + font names from client.config.ts
├── next.config.mjs
└── tsconfig.json            # "@/*" path alias → project root
```

---

## How `client.config.ts` flows into the theme

```
                       config/client.config.ts
                       (theme.colors, theme.fonts)
                                  │
        ┌─────────────────────────┼──────────────────────────┐
        ▼                         ▼                           ▼
 tailwind.config.ts         app/layout.tsx              components/*
 imports clientConfig       • next/font → CSS vars       use Tailwind tokens
 • colors.primary  ──▶      --font-heading/body/arabic   (bg-primary, text-accent,
   exposed as `primary`     • inline <style> seeds          font-heading, rounded-brand)
   (bg-primary, etc.)         --color-primary/secondary/   …and read brand/contact/
 • fonts.* mapped to          accent from config            social/hours straight
   font-heading/body/arabic • <html lang/dir> default       from clientConfig
   via var(--font-*)
```

**Step by step:**

1. **Colors → Tailwind.** [`tailwind.config.ts`](tailwind.config.ts) imports
   `clientConfig` and maps `theme.colors.{primary,secondary,accent,…}` to named
   Tailwind colors. So `bg-primary`, `text-accent`, `border-secondary` resolve to
   the client's hex values at build time — change the hex in config, rebuild, done.

2. **Colors → CSS variables (runtime).** [`app/layout.tsx`](app/layout.tsx) also
   injects `--color-primary/secondary/accent` as an inline `<style>` from the same
   config, so raw CSS (or a future CMS-driven palette) can theme without a rebuild.

3. **Fonts.** The config names the typefaces (`Poppins` / `Inter` / `Cairo`).
   `app/layout.tsx` loads them via `next/font` and exposes
   `--font-heading` / `--font-body` / `--font-arabic`. Tailwind's `fontFamily`
   (`font-heading`, `font-body`, `font-arabic`) references those variables, with the
   config family names as the documented fallback.

4. **Radius.** `theme.radius` selects the `rounded-brand` token used across every
   UI primitive, so corner styling is consistent and config-driven.

5. **Everything else** (brand name/logo/tagline, phone, WhatsApp, email, address,
   opening hours, map query, social links, GA4 id, feature flags) is read directly
   from `clientConfig` inside components and `lib/` helpers — never hard-coded.

---

## Bilingual (EN / AR) & RTL

- **`LanguageProvider`** holds the active locale, persists it to `localStorage`, and
  keeps `<html lang>` / `<html dir>` in sync. Switching to Arabic sets `dir="rtl"`,
  flipping the whole layout; logical CSS (`ms-*`, `me-*`, `end-*`) mirrors automatically.
- **Dictionaries** live in `lib/i18n/dictionaries/` — `en.ts` is the source of truth;
  `ar.ts` is typed against it so a missing key is a compile error.
- **Config strings** that differ per language use the `Localized` shape
  (`{ en, ar }`) and are resolved with the context's `t()` helper.
- **`LanguageToggle`** only renders when `features.enableBilingual` is `true`.

## Feature flags

`features` in the config gates optional capability: `enableAuth`, `enablePayments`,
`enableCMS`, `enableBilingual`. The template ships with
`auth=false, payments=false, cms=true, bilingual=true`. Components consult these
flags (e.g. the language toggle), so flipping one turns the capability on/off
without code changes.

## Analytics

Set `analytics.ga4Id` to a `G-XXXXXXXXXX` id to enable GA4. Left empty, the
`<Analytics />` component renders nothing — analytics is off by default.

## Next steps (not built yet, by design)

Compose pages in `app/` from `@/components` (Home, Services, Team, Contact…), wire
`AppointmentForm`'s `onSubmit` to an API route / email service / CMS, and add real
brand assets to `/public/brand/`.
