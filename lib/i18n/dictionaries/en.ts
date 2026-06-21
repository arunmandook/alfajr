/**
 * English copy. Mirror every key in ar.ts.
 * Keep this client-agnostic where possible — brand-specific strings live in
 * config/client.config.ts. These are reusable UI labels.
 */
const en = {
  nav: {
    home: "Home",
    services: "Services",
    team: "Our Team",
    about: "About",
    contact: "Contact",
    book: "Book Appointment",
  },
  common: {
    callNow: "Call Now",
    whatsapp: "WhatsApp",
    bookNow: "Book Now",
    learnMore: "Learn More",
    getDirections: "Get Directions",
    sendMessage: "Send Message",
    readMore: "Read More",
    viewAll: "View All",
    openNow: "Open now",
    closedNow: "Closed",
    closed: "Closed",
    today: "Today",
  },
  hero: {
    badge: "Trusted rehabilitation care",
  },
  booking: {
    title: "Book your appointment",
    subtitle: "Request a session and our team will confirm with you shortly.",
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    service: "Service required",
    selectService: "Select a service",
    date: "Preferred date",
    time: "Preferred time",
    message: "Message (optional)",
    submit: "Request Appointment",
    submitting: "Sending…",
    success: "Thank you! We have received your request and will be in touch shortly.",
    error: "Something went wrong. Please try again or call us directly.",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
  },
  hours: {
    title: "Opening Hours",
    days: {
      "0": "Sunday",
      "1": "Monday",
      "2": "Tuesday",
      "3": "Wednesday",
      "4": "Thursday",
      "5": "Friday",
      "6": "Saturday",
    },
  },
  contact: {
    title: "Get in touch",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
  },
  footer: {
    quickLinks: "Quick Links",
    contact: "Contact",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    builtWith: "Find us",
  },
  language: {
    label: "Language",
    en: "English",
    ar: "العربية",
  },
};

export default en;
export type Dictionary = typeof en;
