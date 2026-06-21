import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, Amiri } from "next/font/google";
import { clientConfig } from "@/config/client.config";
import { defaultLocale, getDirection } from "@/lib/i18n/config";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

/**
 * Fonts are loaded here and exposed as CSS variables. The family names in
 * client.config.ts (theme.fonts) document the intended typefaces; if you change
 * them, swap the next/font import below to match.
 */
const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});
const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const { brand, theme } = clientConfig;

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline.en}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline.en,
  icons: { icon: brand.favicon },
};

/** Seed brand colors as CSS variables so they're available to raw CSS too. */
const themeVars = `:root{--color-primary:${theme.colors.primary};--color-secondary:${theme.colors.secondary};--color-accent:${theme.colors.accent};}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={defaultLocale}
      dir={getDirection(defaultLocale)}
      className={`${body.variable} ${heading.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body>
        <LanguageProvider initialLocale={defaultLocale}>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
