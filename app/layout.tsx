import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Al Fajr Rehabilitation Centre | Premium Physiotherapy Dubai",
  description: "Dubai's leading physiotherapy and rehabilitation centre. Expert care for sports injuries, post-surgery rehab, chronic pain, and neurological conditions.",
  keywords: "physiotherapy dubai, rehabilitation centre dubai, sports injury treatment, back pain physiotherapy",
  openGraph: {
    title: "Al Fajr Rehabilitation Centre",
    description: "Premium physiotherapy and rehabilitation in Dubai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <body>
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
