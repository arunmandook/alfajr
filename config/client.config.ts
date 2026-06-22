/**
 * ============================================================================
 *  CLIENT CONFIG — the single source of truth for everything client-specific.
 * ============================================================================
 *
 *  To re-skin this template for a new client, you should only ever need to edit
 *  THIS file (plus swap assets in /public and copy in /lib/i18n/dictionaries).
 *
 *  Flow:
 *    client.config.ts ──▶ tailwind.config.ts   (colors + font family names)
 *                     └─▶ app/layout.tsx        (CSS variables, fonts, metadata)
 *                     └─▶ components/*           (brand, contact, social, hours…)
 *
 *  The type definitions below are exported so consuming code is fully typed and
 *  autocompletes every field.
 * ============================================================================
 */

/** A localized string. Every user-facing label has an English + Arabic value. */
export interface Localized {
  en: string;
  ar: string;
}

export interface BrandConfig {
  /** Internal/legal name, used in metadata & copyright. */
  name: string;
  /** Display name shown in the header (localized). */
  displayName: Localized;
  /** Path (under /public) to the primary logo. */
  logo: string;
  /** Optional inverted/white logo for dark backgrounds (footer, etc.). */
  logoLight?: string;
  /** Favicon path under /public. */
  favicon: string;
  /** Short marketing tagline (localized). */
  tagline: Localized;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    /** Optional extra roles — used by components if present. */
    neutral?: string;
    background?: string;
    foreground?: string;
  };
  fonts: {
    /** Font family used for headings (must be loaded in app/layout.tsx). */
    heading: string;
    /** Font family used for body copy. */
    body: string;
    /** Font family used when the document is in Arabic (RTL). */
    arabic: string;
  };
  /** Global corner rounding token applied across UI primitives. */
  radius: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

export interface OpeningHour {
  /** 0 = Sunday … 6 = Saturday (UAE work week starts Monday/ends Saturday). */
  day: number;
  label: Localized;
  /** 24h "HH:MM" or null when closed. */
  open: string | null;
  close: string | null;
}

export interface ContactConfig {
  phone: string;
  /** WhatsApp number in full international format, digits only (e.g. 9715…). */
  whatsapp: string;
  email: string;
  address: Localized;
  openingHours: OpeningHour[];
}

export interface MapConfig {
  lat: number;
  lng: number;
  /** A search/place query used to build the Google Maps embed URL. */
  embedQuery: string;
  /** Default zoom level for embeds. */
  zoom: number;
}

export interface SocialLink {
  platform:
    | "instagram"
    | "facebook"
    | "tiktok"
    | "x"
    | "youtube"
    | "linkedin"
    | "snapchat";
  url: string;
  label: string;
}

export interface AnalyticsConfig {
  /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Leave "" to disable. */
  ga4Id: string;
}

export interface FeatureFlags {
  enableAuth: boolean;
  enablePayments: boolean;
  enableCMS: boolean;
  enableBilingual: boolean;
}

export interface ClientConfig {
  locale: {
    default: "en" | "ar";
    /** Languages offered when enableBilingual is true. */
    supported: ("en" | "ar")[];
  };
  brand: BrandConfig;
  theme: ThemeConfig;
  contact: ContactConfig;
  map: MapConfig;
  social: SocialLink[];
  analytics: AnalyticsConfig;
  features: FeatureFlags;
}

// ============================================================================
//  EXAMPLE CLIENT — Al Fajr Rehabilitation Centre, Ras Al Khaimah, UAE
// ============================================================================

export const clientConfig: ClientConfig = {
  locale: {
    default: "en",
    supported: ["en", "ar"],
  },

  brand: {
    name: "Al Fajr Rehabilitation Centre",
    displayName: {
      en: "Al Fajr Rehabilitation Centre",
      ar: "مركز الفجر لإعادة التأهيل",
    },
    logo: "/brand/logo.svg",
    logoLight: "/brand/logo-light.svg",
    favicon: "/favicon.svg",
    tagline: {
      en: "Expert physiotherapy & rehabilitation in Ras Al Khaimah",
      ar: "علاج طبيعي وإعادة تأهيل متخصص في رأس الخيمة",
    },
  },

  theme: {
    colors: {
      primary: "#7A0020", // deep crimson — main brand
      secondary: "#A80030", // medium crimson — hero / footer
      accent: "#E8001A", // vivid red — call-to-action
      neutral: "#C47080", // muted rose — secondary text
      background: "#FFF5F5", // warm cream
      foreground: "#1A0005", // near-black with red tint — body text
    },
    fonts: {
      heading: "Cormorant Garamond", // elegant editorial serif
      body: "Outfit", // clean geometric sans
      arabic: "Amiri",
    },
    radius: "lg",
  },

  contact: {
    phone: "+971 7 123 4567",
    whatsapp: "9717123456789",
    email: "info@alfajrrehab.ae",
    address: {
      en: "Al Nakheel, Corniche Road, Ras Al Khaimah, United Arab Emirates",
      ar: "النخيل، شارع الكورنيش، رأس الخيمة، الإمارات العربية المتحدة",
    },
    // UAE work week: open Mon–Sat, closed Friday afternoon / Sunday as configured.
    openingHours: [
      { day: 1, label: { en: "Monday", ar: "الإثنين" }, open: "08:00", close: "20:00" },
      { day: 2, label: { en: "Tuesday", ar: "الثلاثاء" }, open: "08:00", close: "20:00" },
      { day: 3, label: { en: "Wednesday", ar: "الأربعاء" }, open: "08:00", close: "20:00" },
      { day: 4, label: { en: "Thursday", ar: "الخميس" }, open: "08:00", close: "20:00" },
      { day: 5, label: { en: "Friday", ar: "الجمعة" }, open: "14:00", close: "20:00" },
      { day: 6, label: { en: "Saturday", ar: "السبت" }, open: "09:00", close: "18:00" },
      { day: 0, label: { en: "Sunday", ar: "الأحد" }, open: null, close: null },
    ],
  },

  map: {
    lat: 25.7895,
    lng: 55.9432,
    embedQuery: "Ras Al Khaimah Corniche, United Arab Emirates",
    zoom: 14,
  },

  social: [
    { platform: "instagram", url: "https://instagram.com/alfajrrehab", label: "Instagram" },
    { platform: "facebook", url: "https://facebook.com/alfajrrehab", label: "Facebook" },
    { platform: "tiktok", url: "https://tiktok.com/@alfajrrehab", label: "TikTok" },
    { platform: "youtube", url: "https://youtube.com/@alfajrrehab", label: "YouTube" },
  ],

  analytics: {
    ga4Id: "", // e.g. "G-XXXXXXXXXX" — leave empty to keep analytics off.
  },

  features: {
    enableAuth: false,
    enablePayments: false,
    enableCMS: true,
    enableBilingual: true,
  },
};

export default clientConfig;
