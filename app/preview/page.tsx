"use client";

/**
 * TEMPORARY showcase route (/preview) — demonstrates the component library with
 * sample data. Not part of the deliverable site; delete when real pages exist.
 */
import {
  Header,
  Footer,
  Hero,
  Section,
  Reveal,
  BookingCTA,
  ServiceCard,
  TeamMemberCard,
  AppointmentForm,
  WhatsAppFloat,
  type Service,
  type TeamMember,
} from "@/components";

const services: Service[] = [
  {
    id: "physio",
    icon: "🦴",
    title: { en: "Physiotherapy", ar: "العلاج الطبيعي" },
    description: {
      en: "Evidence-based treatment for pain, injury and mobility.",
      ar: "علاج قائم على الأدلة للألم والإصابات والحركة.",
    },
  },
  {
    id: "sports",
    icon: "🏃",
    title: { en: "Sports Rehabilitation", ar: "إعادة التأهيل الرياضي" },
    description: {
      en: "Return-to-play programmes for athletes of every level.",
      ar: "برامج العودة للعب للرياضيين من جميع المستويات.",
    },
  },
  {
    id: "neuro",
    icon: "🧠",
    title: { en: "Neuro Rehab", ar: "إعادة التأهيل العصبي" },
    description: {
      en: "Stroke and neurological recovery with specialist care.",
      ar: "التعافي من السكتة الدماغية والحالات العصبية برعاية متخصصة.",
    },
  },
];

const team: TeamMember[] = [
  {
    id: "1",
    name: { en: "Dr. Sara Haddad", ar: "د. سارة حداد" },
    role: { en: "Lead Physiotherapist", ar: "أخصائية العلاج الطبيعي الأولى" },
    specialties: [{ en: "Manual therapy", ar: "العلاج اليدوي" }],
  },
  {
    id: "2",
    name: { en: "Omar Al Suwaidi", ar: "عمر السويدي" },
    role: { en: "Sports Therapist", ar: "أخصائي علاج رياضي" },
    specialties: [{ en: "Sports rehab", ar: "التأهيل الرياضي" }],
  },
  {
    id: "3",
    name: { en: "Layla Karim", ar: "ليلى كريم" },
    role: { en: "Neuro Specialist", ar: "أخصائية الأعصاب" },
    specialties: [{ en: "Stroke recovery", ar: "التعافي من السكتة" }],
  },
];

const formServices = services.map((s) => ({ value: s.id, label: s.title }));

export default function PreviewPage() {
  return (
    <>
      <Header />
      <Hero
        title="Move better. Recover faster."
        subtitle="Expert physiotherapy & rehabilitation in the heart of Ras Al Khaimah."
        actions={<BookingCTA />}
      />

      <Section
        id="services"
        eyebrow="What we do"
        title="Our Services"
        subtitle="Specialist rehabilitation programmes tailored to you."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 120}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="team" tone="muted" eyebrow="Meet the team" title="Our Clinicians" align="center">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 120}>
              <TeamMemberCard member={m} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="booking" eyebrow="Get started" title="Book Your Appointment">
        <div className="mx-auto max-w-2xl">
          <AppointmentForm services={formServices} />
        </div>
      </Section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
