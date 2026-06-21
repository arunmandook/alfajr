import type { Dictionary } from "./en";

/**
 * Arabic copy. Must mirror every key in en.ts (typed against Dictionary).
 */
const ar: Dictionary = {
  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    team: "فريقنا",
    about: "من نحن",
    contact: "اتصل بنا",
    book: "احجز موعد",
  },
  common: {
    callNow: "اتصل الآن",
    whatsapp: "واتساب",
    bookNow: "احجز الآن",
    learnMore: "اعرف المزيد",
    getDirections: "احصل على الاتجاهات",
    sendMessage: "إرسال رسالة",
    readMore: "اقرأ المزيد",
    viewAll: "عرض الكل",
    openNow: "مفتوح الآن",
    closedNow: "مغلق",
    closed: "مغلق",
    today: "اليوم",
  },
  hero: {
    badge: "رعاية تأهيلية موثوقة",
  },
  booking: {
    title: "احجز موعدك",
    subtitle: "اطلب جلسة وسيقوم فريقنا بالتأكيد معك قريباً.",
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    service: "الخدمة المطلوبة",
    selectService: "اختر خدمة",
    date: "التاريخ المفضل",
    time: "الوقت المفضل",
    message: "رسالة (اختياري)",
    submit: "طلب موعد",
    submitting: "جارٍ الإرسال…",
    success: "شكراً لك! لقد استلمنا طلبك وسنتواصل معك قريباً.",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    required: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    invalidPhone: "يرجى إدخال رقم هاتف صحيح",
  },
  hours: {
    title: "ساعات العمل",
    days: {
      "0": "الأحد",
      "1": "الإثنين",
      "2": "الثلاثاء",
      "3": "الأربعاء",
      "4": "الخميس",
      "5": "الجمعة",
      "6": "السبت",
    },
  },
  contact: {
    title: "تواصل معنا",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    hours: "ساعات العمل",
  },
  footer: {
    quickLinks: "روابط سريعة",
    contact: "اتصل بنا",
    followUs: "تابعنا",
    rights: "جميع الحقوق محفوظة.",
    builtWith: "موقعنا",
  },
  language: {
    label: "اللغة",
    en: "English",
    ar: "العربية",
  },
};

export default ar;
