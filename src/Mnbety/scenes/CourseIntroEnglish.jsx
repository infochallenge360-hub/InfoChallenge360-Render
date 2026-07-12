// مقدّمة كورس الإنجليزي — موشن جرافيك احترافي فوق فيديو الهوست المتحدّثة
// أسلوب كينِتيك قوي كلمة‑بكلمة (يوازي روح reel.jsx): overshoot متتابع،
// توهّج على الكلمات المفتاحية، شريط كابشن مصمّم بخط أكسنت متحرّك، بادج اسم
// يتركّب طبقة‑طبقة بلمعة ماشية، ولفتات مفاهيم بأيقونة تلف وهي داخلة.
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, radius } from "../theme";
import { LanguageIcon, QuizIcon, CertificateIcon, GrowthIcon } from "../components/Icons";
import {
  FPS,
  TOTAL_FRAMES,
  NAME_PILL_FROM,
  NAME_PILL_TO,
  CUT_FRAME,
  CAPTIONS,
  KEYWORDS,
} from "./courseIntroEnglishData";

export { TOTAL_FRAMES as COURSE_INTRO_ENGLISH_FRAMES };

// لحظات "الضربة" السينمائية — عندها Punch-zoom + فلاش + اهتزاز + خط ضوء + نبضة
const POWER_BEATS = [163, 432, 508, 566, 880, 1433, 1560, 1815];

// كروت الأرقام/النقاط الكبيرة التي "تطلع" بضبابية ثم تتّضح (يمين الشاشة)
// count: رقم يعدّ تصاعدياً من صفر عند الدخول ؛ غير ذلك يُعرض big كنص
const HEROES = [
  { at: 432, dur: 64, prefix: "+", count: 5, small: "سنوات خبرة تدريس", icon: "growth" },
  { at: 508, dur: 58, big: "TOEFL", small: "شهادة دولية معتمدة", icon: "certificate" },
  { at: 566, dur: 66, prefix: "+", count: 5000, small: "متعلّم قصة نجاح", icon: "growth" },
  { at: 880, dur: 62, big: "من الصفر", small: "خطوة بخطوة", icon: "language" },
  { at: 1433, dur: 58, big: "QUIZ", small: "اختبار بعد كل درس", icon: "quiz" },
];

// كلمة عملاقة تنطّ في منتصف الشاشة كذروة درامية
const SLAMS = [{ at: 1815, dur: 36, text: "يلا نبدأ!" }];

// مجموع نبضة الـ punch القريبة من الإطار الحالي
const punchAt = (frame) => {
  let p = 0;
  for (const b of POWER_BEATS) {
    const l = frame - b;
    if (l >= 0 && l <= 16) {
      p = Math.max(p, interpolate(l, [0, 3, 16], [0, 1, 0], { extrapolateRight: "clamp" }));
    }
  }
  return p;
};

// اهتزاز كاميرا: خفيف مستمر (هاند-هيلد) + ضربة قوية متلاشية عند الـ beats
const shakeAt = (frame) => {
  let x = Math.sin(frame / 7) * 2.1 + Math.sin(frame / 13) * 1.3;
  let y = Math.cos(frame / 9) * 1.9 + Math.sin(frame / 17) * 1.1;
  let rot = Math.sin(frame / 23) * 0.16;
  for (const b of POWER_BEATS) {
    const l = frame - b;
    if (l >= 0 && l <= 14) {
      const decay = interpolate(l, [0, 14], [1, 0], { extrapolateRight: "clamp" });
      const amp = 24 * decay;
      x += Math.sin(l * 3.3) * amp;
      y += Math.cos(l * 2.7) * amp;
      rot += Math.sin(l * 3.9) * decay * 0.8;
    }
  }
  return { x, y, rot };
};

// ───────── الخلفية + Punch-zoom + اهتزاز كاميرا + تنفّس زوم خفيف ─────────
// overscan ثابت (scale 1.07) يعطي هامشاً يخفي حواف الاهتزاز/الدوران.
const BackgroundVideo = () => {
  const frame = useCurrentFrame();
  const breathe = 0.008 * Math.sin(frame / 55);
  const scale = 1.07 + breathe + 0.05 * punchAt(frame);
  const { x, y, rot } = shakeAt(frame);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={staticFile("gen/course-intro-english-source.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── خطوط ضوء تعبر الشاشة (على الضربات + خط دوري خفيف) ─────────
const LightStreaks = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const streaks = [];
  POWER_BEATS.forEach((b, idx) => {
    const l = frame - b;
    if (l >= 0 && l <= 15) {
      const p = interpolate(l, [0, 15], [0, 1], { easing: Easing.in(Easing.cubic) });
      const x = interpolate(p, [0, 1], [-420, width + 420]);
      const op = interpolate(l, [0, 3, 15], [0, 0.85, 0], { extrapolateRight: "clamp" });
      streaks.push(
        <div
          key={`b${idx}`}
          style={{
            position: "absolute",
            top: -60,
            bottom: -60,
            left: x,
            width: 240,
            transform: "skewX(-20deg)",
            mixBlendMode: "screen",
            opacity: op,
            filter: "blur(3px)",
            background:
              "linear-gradient(90deg, rgba(43,209,134,0) 0%, rgba(43,209,134,0.5) 40%, rgba(255,255,255,0.95) 50%, rgba(43,209,134,0.5) 60%, rgba(43,209,134,0) 100%)",
          }}
        />,
      );
    }
  });
  const amb = frame % 155;
  if (amb <= 16) {
    const p = interpolate(amb, [0, 16], [0, 1]);
    const x = interpolate(p, [0, 1], [-360, width + 360]);
    const op = interpolate(amb, [0, 4, 16], [0, 0.32, 0], { extrapolateRight: "clamp" });
    streaks.push(
      <div
        key="amb"
        style={{
          position: "absolute",
          top: -60,
          bottom: -60,
          left: x,
          width: 170,
          transform: "skewX(-20deg)",
          mixBlendMode: "screen",
          opacity: op,
          filter: "blur(4px)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
        }}
      />,
    );
  }
  return <AbsoluteFill style={{ pointerEvents: "none" }}>{streaks}</AbsoluteFill>;
};

// ───────── الطبقة السينمائية: أشعة ضوء + جزيئات + فينييت ─────────
const CinematicBackdrop = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // جزيئات طايرة لأعلى بعمق (index-seeded، بلا عشوائية) — أكثف وأكثر توهّجاً
  const parts = [];
  for (let i = 0; i < 42; i++) {
    const seed = i * 137.5;
    const x = (seed * 1.7) % width;
    const speed = 0.5 + (i % 5) * 0.36;
    const drift = Math.sin((frame + seed) / 40) * 22;
    const y = height + 80 - ((frame * speed + seed * 3) % (height + 160));
    const s = 4 + (i % 4) * 5;
    const near = i % 3 === 0;
    parts.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: x + drift,
          top: y,
          width: s,
          height: s,
          borderRadius: "50%",
          background: near ? colors.green400 : "rgba(255,255,255,0.95)",
          opacity: near ? 0.36 : 0.22,
          filter: near ? "blur(1px)" : "blur(2px)",
          boxShadow: near
            ? `0 0 14px rgba(43,209,134,0.8)`
            : `0 0 8px rgba(255,255,255,0.5)`,
        }}
      />,
    );
  }

  const raySlide = Math.sin(frame / 90) * 60;
  const vig = 0.34 + 0.06 * Math.sin(frame / 40);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* أشعة ضوء ناعمة من أعلى اليمين */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${118 + raySlide * 0.05}deg, rgba(43,209,134,0.14) 0%, rgba(43,209,134,0) 32%, rgba(255,255,255,0.09) 52%, rgba(43,209,134,0) 72%)`,
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      />
      {parts}
      {/* فينييت سينمائي نابض */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 50% 46%, rgba(0,0,0,0) 52%, rgba(0,0,0,${vig}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ───────── فلاش أبيض خاطف على الضربات ─────────
const BeatFlash = () => {
  const frame = useCurrentFrame();
  let op = 0;
  for (const b of POWER_BEATS) {
    const l = frame - b;
    if (l >= 0 && l <= 10) {
      op = Math.max(op, interpolate(l, [0, 2, 10], [0, 0.18, 0], { extrapolateRight: "clamp" }));
    }
  }
  if (op <= 0) return null;
  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", opacity: op, pointerEvents: "none" }} />
  );
};

// ───────── نبضة توهّج خضراء تملأ الشاشة على الضربات ─────────
const BloomPulse = () => {
  const frame = useCurrentFrame();
  let op = 0;
  for (const b of POWER_BEATS) {
    const l = frame - b;
    if (l >= 0 && l <= 15) {
      op = Math.max(op, interpolate(l, [0, 3, 15], [0, 0.24, 0], { extrapolateRight: "clamp" }));
    }
  }
  if (op <= 0) return null;
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(43,209,134,0.55) 0%, rgba(43,209,134,0) 60%)",
        mixBlendMode: "screen",
        opacity: op,
        pointerEvents: "none",
      }}
    />
  );
};

// ───────── كلمة عملاقة تنطّ في منتصف الشاشة (ذروة درامية) ─────────
const CenterSlam = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = SLAMS.find((s) => frame >= s.at && frame < s.at + s.dur);
  if (!a) return null;

  const local = frame - a.at;
  const s = spring({ frame: local, fps, config: { damping: 12, mass: 0.9 } });
  const outOp = interpolate(local, [a.dur - 8, a.dur], [1, 0], { extrapolateLeft: "clamp" });
  const op = Math.min(interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }), outOp);
  const scale = interpolate(s, [0, 1], [1.8, 1]);
  const blur = interpolate(s, [0, 1], [22, 0], { extrapolateRight: "clamp" });
  const beat = Math.max(0, Math.sin(frame / 7));

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}
    >
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,19,17,0.6) 0%, rgba(14,19,17,0) 62%)",
          opacity: op,
        }}
      />
      <div
        style={{
          opacity: op,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
          fontFamily: fonts.heading,
          fontWeight: 900,
          fontSize: 200,
          color: colors.white,
          textShadow: `0 0 ${40 + 24 * beat}px rgba(43,209,134,0.95), 0 6px 30px rgba(0,0,0,0.5)`,
          direction: "rtl",
        }}
      >
        {a.text}
      </div>
    </AbsoluteFill>
  );
};

// ───────── شريط الكابشن المصمّم ─────────
// القاعدة معتمة 100% لتغطية السابتايتل المحروق تماماً، مع تلاشٍ ناعم لأعلى،
// وخط أكسنت أخضر رفيع بلمعة متحرّكة تمشي على طوله (إحساس بثّ حيّ).
const CaptionPanel = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 7) % 520;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 220,
          background:
            "linear-gradient(to top, rgba(14,19,17,1) 0%, rgba(14,19,17,1) 76%, rgba(14,19,17,0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 168,
          height: 3,
          opacity: 0.9,
          background: `linear-gradient(90deg, rgba(11,199,114,0) 0%, ${colors.green} 22%, ${colors.green400} 50%, ${colors.green} 78%, rgba(11,199,114,0) 100%)`,
          backgroundSize: "520px 100%",
          backgroundPosition: `${shift}px 0`,
          boxShadow: `0 0 14px rgba(11,199,114,0.5)`,
        }}
      />
    </>
  );
};

// كلمة واحدة تطلع بـ overshoot + طفو مستمر، والكلمة المفتاحية تكبر وتتوهّج
const Word = ({ children, delay, index, localBase, isKeyword }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = localBase - delay;
  const s = spring({ frame: t, fps, config: { damping: 11, mass: 0.55, stiffness: 150 } });
  const appear = interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [22, 0]);
  const pop = interpolate(s, [0, 1], [0.5, 1]);
  const float = Math.sin(frame / 18 + index) * 2.4;
  const beat = Math.max(0, Math.sin(frame / 9));
  const pulse = isKeyword ? 1 + 0.055 * beat : 1;
  const color = isKeyword ? colors.green400 : colors.white;
  const shadow = isKeyword
    ? `0 0 ${16 + 10 * beat}px rgba(43,209,134,0.65)`
    : "0 3px 14px rgba(0,0,0,0.6)";
  return (
    <span
      style={{
        display: "inline-block",
        margin: "0 0.14em",
        opacity: appear,
        color,
        transform: `translateY(${y + float}px) scale(${pop * pulse})`,
        textShadow: shadow,
      }}
    >
      {children}
    </span>
  );
};

// ───────── الكابشن الحركي (كلمة‑بكلمة) ─────────
const KineticCaption = () => {
  const frame = useCurrentFrame();
  const active = CAPTIONS.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;

  const local = frame - active.from;
  const outOp = interpolate(frame, [active.to - 6, active.to], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const words = active.text.split(" ");
  const kw = active.keyword ? active.keyword.split(" ") : [];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 46,
        opacity: outOp,
        direction: "rtl",
        textAlign: "center",
        padding: "0 90px",
        fontFamily: fonts.heading,
        fontWeight: 800,
        fontSize: 48,
        lineHeight: 1.35,
      }}
    >
      {words.map((w, i) => (
        <Word
          key={`${active.from}-${i}`}
          delay={2 + i * 2}
          index={i}
          localBase={local}
          isKeyword={kw.includes(w)}
        >
          {w}
        </Word>
      ))}
    </div>
  );
};

// ───────── بطاقة الاسم — البطاقة الخضراء نفسها تغطّي الشارة القديمة ─────────
// لا يوجد صندوق تغطية داكن منفصل: البطاقة تظهر فوراً (opacity سريع، بدون
// تصغير) فتغطّي نصّ الشارة الأصلية بالكامل، والمحتوى يتركّب فوقها طبقة‑طبقة.
const NamePill = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < NAME_PILL_FROM || frame >= NAME_PILL_TO) return null;

  const local = frame - NAME_PILL_FROM;
  const win = NAME_PILL_TO - NAME_PILL_FROM;
  const barS = spring({ frame: local - 2, fps, config: { damping: 15, mass: 0.4 } });
  const nameS = spring({ frame: local - 6, fps, config: { damping: 16, mass: 0.6 } });
  const roleS = spring({ frame: local - 13, fps, config: { damping: 18 } });
  const plateIn = interpolate(local, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  const outOp = interpolate(local, [win - 16, win], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(plateIn, outOp);
  const float = Math.sin(frame / 22) * 2.5;
  const shine = ((local * 9) % 340) - 90;

  return (
    <div
      style={{
        position: "absolute",
        left: 44,
        top: 872,
        minWidth: 470,
        opacity,
        transform: `translateY(${float}px)`,
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: colors.green,
        borderRadius: radius.pill,
        padding: "30px 28px 34px 36px",
        boxShadow: "0 14px 34px rgba(11,199,114,0.4)",
        overflow: "hidden",
      }}
    >
      {/* شريط أكسنت أبيض ينمو على الحافة القائدة */}
      <div
        style={{
          width: 5,
          height: interpolate(barS, [0, 1], [0, 42], { extrapolateRight: "clamp" }),
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.9)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          opacity: interpolate(nameS, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(nameS, [0, 1], [16, 0])}px)`,
          fontFamily: fonts.heading,
          fontWeight: 800,
          fontSize: 34,
          color: colors.white,
          whiteSpace: "nowrap",
        }}
      >
        ميار مدحت
      </div>
      <div style={{ width: 2, height: 26, backgroundColor: "rgba(255,255,255,0.45)" }} />
      <div
        style={{
          opacity: interpolate(roleS, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(roleS, [0, 1], [14, 0])}px)`,
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: 24,
          color: "rgba(255,255,255,0.92)",
          whiteSpace: "nowrap",
        }}
      >
        مدرّبة اللغة الإنجليزية
      </div>
      {/* لمعة تمرّ على البطاقة */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: shine,
          width: 60,
          transform: "skewX(-18deg)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
};

const KEYWORD_ICONS = {
  language: LanguageIcon,
  certificate: CertificateIcon,
  growth: GrowthIcon,
  quiz: QuizIcon,
};

// ───────── لفتة كلمة مفتاحية — أيقونة تلف وهي داخلة + توهّج نابض ─────────
const KeywordCallouts = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // نخفي اللفتة الصغيرة كلما ظهر كرت hero كبير (لتفادي الازدحام والتكرار)
  const heroActive = HEROES.some((h) => frame >= h.at && frame < h.at + h.dur);
  if (heroActive) return null;
  const active = KEYWORDS.find((k) => frame >= k.at && frame < k.at + k.dur);
  if (!active) return null;

  const local = frame - active.at;
  const s = spring({ frame: local, fps, config: { damping: 12, mass: 0.6 } });
  const labelS = spring({ frame: local - 4, fps, config: { damping: 16, mass: 0.5 } });
  const outOp = interpolate(local, [active.dur - 10, active.dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(s, outOp);
  const scale = interpolate(s, [0, 1], [0.5, 1]);
  const iconRot = interpolate(s, [0, 1], [-120, 0]);
  const beat = Math.max(0, Math.sin(frame / 8));
  const Icon = KEYWORD_ICONS[active.icon];

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 120,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(255,255,255,0.97)",
        borderRadius: radius.pill,
        padding: "14px 30px 14px 14px",
        boxShadow: "0 16px 38px rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: radius.pill,
          backgroundColor: colors.green,
          color: colors.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 11,
          flexShrink: 0,
          transform: `rotate(${iconRot}deg)`,
          boxShadow: `0 0 ${12 + 8 * beat}px rgba(11,199,114,0.7)`,
        }}
      >
        <Icon />
      </div>
      <div
        style={{
          opacity: interpolate(labelS, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(labelS, [0, 1], [16, 0])}px)`,
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 30,
          color: colors.ink,
          whiteSpace: "nowrap",
        }}
      >
        {active.label}
      </div>
    </div>
  );
};

// ───────── كرت "hero" كبير — رقم/نقطة تطلع بضبابية ثم تتّضح (يمين الشاشة) ─────────
const HeroCard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = HEROES.find((h) => frame >= h.at && frame < h.at + h.dur);
  if (!active) return null;

  const local = frame - active.at;
  const s = spring({ frame: local, fps, config: { damping: 13, mass: 0.8 } });
  const smallS = spring({ frame: local - 8, fps, config: { damping: 16, mass: 0.6 } });
  const outOp = interpolate(local, [active.dur - 12, active.dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }), outOp);
  const x = interpolate(s, [0, 1], [70, 0]);
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const blur = interpolate(s, [0, 1], [16, 0], { extrapolateRight: "clamp" });
  const beat = Math.max(0, Math.sin(frame / 8));
  const Icon = KEYWORD_ICONS[active.icon];

  // انفجار أشعة خلف الكرت عند الدخول
  const burst = interpolate(local, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // رقم يعدّ تصاعدياً من صفر
  let display = active.big;
  if (active.count != null) {
    const v = Math.round(
      interpolate(local, [0, 30], [0, active.count], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }),
    );
    display = `${active.prefix || ""}${v}`;
  }

  return (
    <div
      style={{
        position: "absolute",
        right: 70,
        top: 360,
        width: 520,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        transformOrigin: "right center",
        filter: `blur(${blur}px)`,
        direction: "rtl",
      }}
    >
      {/* أشعة تنفجر للخارج */}
      <div
        style={{
          position: "absolute",
          inset: -90,
          borderRadius: "50%",
          background:
            "repeating-conic-gradient(from 0deg, rgba(43,209,134,0.20) 0deg 5deg, rgba(43,209,134,0) 5deg 15deg)",
          transform: `scale(${0.5 + burst * 1.1}) rotate(${local * 3}deg)`,
          opacity: (1 - burst) * 0.55,
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      {/* حلقة تتوسّع */}
      <div
        style={{
          position: "absolute",
          inset: -30,
          borderRadius: 40,
          border: `3px solid rgba(43,209,134,${(1 - burst) * 0.6})`,
          transform: `scale(${0.7 + burst * 0.7})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          background: "linear-gradient(150deg, rgba(9,40,24,0.86), rgba(14,19,17,0.86))",
          border: `2px solid rgba(43,209,134,${0.55 + 0.35 * beat})`,
          borderRadius: 28,
          padding: "40px 44px",
          boxShadow: `0 26px 70px rgba(0,0,0,0.5), 0 0 ${34 + 26 * beat}px rgba(11,199,114,0.5)`,
        }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 10 }}>
        <div
          style={{
            width: 66,
            height: 66,
            borderRadius: radius.pill,
            backgroundColor: colors.green,
            color: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            flexShrink: 0,
            boxShadow: `0 0 ${16 + 10 * beat}px rgba(11,199,114,0.8)`,
          }}
        >
          <Icon />
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 900,
            fontSize: 104,
            lineHeight: 1,
            color: colors.white,
            textShadow: `0 0 ${22 + 16 * beat}px rgba(43,209,134,0.8)`,
            direction: "ltr",
          }}
        >
          {display}
        </div>
      </div>
      <div
        style={{
          opacity: interpolate(smallS, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(smallS, [0, 1], [18, 0])}px)`,
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 34,
          color: colors.green400,
        }}
      >
        {active.small}
      </div>
      </div>
    </div>
  );
};

// ───────── انتقال أخضر يخفي القطع لكرت الختام (توقيت مُنعّم + حلقة بيضاء) ─────────
const CutWipe = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const spread = 22;
  const from = CUT_FRAME - spread;
  const to = CUT_FRAME + spread;
  if (frame < from || frame > to) return null;

  const maxR = Math.hypot(width, height) / 2 + 80;
  const r =
    frame <= CUT_FRAME
      ? interpolate(frame, [from, CUT_FRAME], [0, maxR], {
          extrapolateLeft: "clamp",
          easing: Easing.in(Easing.cubic),
        })
      : interpolate(frame, [CUT_FRAME, to], [maxR, 0], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
  const clip = `circle(${r}px at 50% 50%)`;
  const ringR = frame <= CUT_FRAME ? r + 26 : 0;
  const ringOp = interpolate(frame, [from, CUT_FRAME - 4, CUT_FRAME], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {ringR > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: ringR * 2,
            height: ringR * 2,
            marginLeft: -ringR,
            marginTop: -ringR,
            borderRadius: "50%",
            border: `4px solid rgba(255,255,255,${ringOp})`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: colors.green,
          clipPath: clip,
          WebkitClipPath: clip,
        }}
      />
    </>
  );
};

export const MnbetyCourseIntroEnglish = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <BackgroundVideo />
      <CinematicBackdrop />
      <BloomPulse />
      <CaptionPanel />
      <KineticCaption />
      <NamePill />
      <KeywordCallouts />
      <HeroCard />
      <LightStreaks />
      <CenterSlam />
      <BeatFlash />
      <CutWipe />
    </AbsoluteFill>
  );
};
