import { clientConfig } from "@/config/client.config";

/**
 * Placeholder landing page.
 *
 * Per the template brief, real marketing pages are NOT built yet — this file
 * exists only so the app runs. It renders a short "foundation ready" notice and
 * pulls a couple of values from client.config.ts to prove the wiring works.
 *
 * To start building, compose the component library here, e.g.:
 *
 *   import { Header, Hero, Section, ServiceCard, Footer, WhatsAppFloat } from "@/components";
 *
 *   export default function Home() {
 *     return (
 *       <>
 *         <Header />
 *         <Hero title="…" subtitle="…" actions={<BookingCTA />} />
 *         <Section id="services" title="Our Services"> … </Section>
 *         <Footer />
 *         <WhatsAppFloat />
 *       </>
 *     );
 *   }
 */
export default function Home() {
  const { brand, theme, features } = clientConfig;

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="inline-flex items-center rounded-brand bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
        Template foundation ready
      </span>
      <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
        {brand.name}
      </h1>
      <p className="max-w-xl text-lg text-neutral">{brand.tagline.en}</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {[theme.colors.primary, theme.colors.secondary, theme.colors.accent].map(
          (c) => (
            <span
              key={c}
              className="flex items-center gap-2 rounded-brand border border-neutral/20 px-3 py-1.5 text-sm"
            >
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: c }}
              />
              {c}
            </span>
          ),
        )}
      </div>

      <p className="mt-6 max-w-md text-sm text-neutral">
        Components, config, and bilingual i18n are wired. Build pages by composing{" "}
        <code className="rounded bg-neutral/10 px-1.5 py-0.5">@/components</code> in{" "}
        <code className="rounded bg-neutral/10 px-1.5 py-0.5">app/</code>. Bilingual:{" "}
        {features.enableBilingual ? "EN / AR enabled" : "disabled"}.
      </p>
    </main>
  );
}
