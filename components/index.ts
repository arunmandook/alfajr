/**
 * Component library barrel. Import from "@/components" anywhere:
 *   import { Header, Hero, ServiceCard } from "@/components";
 */

// Layout
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";

// UI primitives
export { Section } from "./ui/Section";
export { Hero } from "./ui/Hero";
export { Reveal } from "./ui/Reveal";
export { CTAButton } from "./ui/CTAButton";
export type { CTAButtonProps } from "./ui/CTAButton";
export { BookingCTA } from "./ui/BookingCTA";
export { CallButton } from "./ui/CallButton";
export { default as WhatsAppFloat } from "./ui/WhatsAppFloat";
export { MapEmbed } from "./ui/MapEmbed";
export { OpeningHours } from "./ui/OpeningHours";
export { SocialLinks } from "./ui/SocialLinks";
export { LanguageToggle } from "./ui/LanguageToggle";

// Cards
export { ServiceCard } from "./cards/ServiceCard";
export type { Service } from "./cards/ServiceCard";
export { TeamMemberCard } from "./cards/TeamMemberCard";
export type { TeamMember } from "./cards/TeamMemberCard";

// Forms
export { AppointmentForm } from "./forms/AppointmentForm";
export type { AppointmentFormValues } from "./forms/AppointmentForm";

// Providers & analytics
export { LanguageProvider, useLanguage, useTranslation } from "./providers/LanguageProvider";
export { Analytics } from "./Analytics";
