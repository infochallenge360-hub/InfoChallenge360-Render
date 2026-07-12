// أيقونات خطّية بسيطة بنفس روح الهوية — تُلوّن عبر stroke=currentColor
import React from "react";

const base = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// متجر / واجهة محل
export const StoreIcon = () => (
  <svg {...base}>
    <path d="M3 9l1.5-4.5A1 1 0 0 1 5.45 4h13.1a1 1 0 0 1 .95.5L21 9" />
    <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
    <path d="M3 9a2.5 2.5 0 0 0 4.5 1.5 2.5 2.5 0 0 0 4.5 0 2.5 2.5 0 0 0 4.5 0A2.5 2.5 0 0 0 21 9" />
    <path d="M9 20v-5h6v5" />
  </svg>
);

// منتجات / صندوق
export const BoxIcon = () => (
  <svg {...base}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
);

// نمو / وصول
export const GrowthIcon = () => (
  <svg {...base}>
    <path d="M3 17l5-5 4 4 8-8" />
    <path d="M15 8h6v6" />
  </svg>
);

// قلب / منزل (للمسات العاطفية)
export const HomeHeartIcon = () => (
  <svg {...base}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    <path d="M12 17c-1.6-1.2-3-2.2-3-3.6A1.6 1.6 0 0 1 12 12a1.6 1.6 0 0 1 3 1.4c0 1.4-1.4 2.4-3 3.6z" />
  </svg>
);

// لغة / تواصل — كرة أرضية بخطوط طول وعرض
export const LanguageIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

// كويز / سؤال — علامة استفهام داخل دائرة
export const QuizIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9a3 3 0 1 1 4 2.8c-.7.4-1 1-1 1.7v.3" />
    <path d="M12 17h.01" />
  </svg>
);

// شهادة / إنجاز — شريط مع ميدالية
export const CertificateIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="8" r="5" />
    <path d="M9 12.5 7 21l5-3 5 3-2-8.5" />
  </svg>
);
