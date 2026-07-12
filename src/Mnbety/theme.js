// نظام تصميم "من بيتي" — متغيّرات الهوية البصرية المستخدمة في الفيديو
// مرجع: design-system.md

import { loadFont as loadTajawal } from "@remotion/google-fonts/Tajawal";
import { loadFont as loadIBMPlex } from "@remotion/google-fonts/IBMPlexSansArabic";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const tajawal = loadTajawal("normal", {
  weights: ["400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});
const ibm = loadIBMPlex("normal", {
  weights: ["400", "500", "600"],
  subsets: ["arabic", "latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  // العناوين — هندسي مدوّر يوازي الشعار
  heading: tajawal.fontFamily,
  // النص الأساسي — عالي الوضوح
  body: ibm.fontFamily,
  // اللاتيني والأرقام و mnbety.com
  latin: inter.fontFamily,
};

export const colors = {
  green: "#0BC772",
  green400: "#2BD186",
  green600: "#09A85F",
  green700: "#08894E",
  green900: "#054E2D",
  green100: "#C6F3DE",
  green50: "#E9FBF2",
  ink: "#0E1311",
  white: "#FFFFFF",
  muted: "#F4F7F5",
  border: "#E6EBE8",
};

export const radius = {
  sm: 14,
  lg: 24,
  pill: 999,
};

// مقاسات الفيديو (ريلز عمودي 9:16)
export const video = {
  width: 1080,
  height: 1920,
  fps: 30,
};
