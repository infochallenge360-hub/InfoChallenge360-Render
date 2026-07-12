// إعادة بناء احترافية كاملة لإعلان «كورس تحسين الملف الشخصي على LinkedIn»
// أبيض + أخضر (هوية من بيتي) — أزرق LinkedIn فقط لعناصر لينكدإن — صوت أصلي متزامن
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, radius } from "../theme";
import { LightBg } from "./LightBg";
import { Reveal } from "../components/Reveal";
import { LINKEDIN, Check, Chip, MiniProfile, Node } from "./bits";

export const CAREER_FRAMES = 3060; // 102s @30fps

// ───────── ثابتة ─────────
const LogoBug = () => (
  <div style={{ position: "absolute", top: 50, right: 60, zIndex: 60 }}>
    <Img src={staticFile("brand/logo-full.png")} style={{ height: 64 }} />
  </div>
);

const GreenWipe = ({ start, dur = 22 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - start;
  if (local < 0 || local > dur) return null;
  const half = dur / 2;
  const maxR = Math.hypot(width, height) / 2 + 80;
  const r = local <= half ? interpolate(local, [0, half], [0, maxR]) : maxR;
  const op = local <= half ? 1 : interpolate(local, [half, dur], [1, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 50 }}>
      <div style={{ width: r * 2, height: r * 2, borderRadius: "50%", background: colors.green, opacity: op }} />
    </AbsoluteFill>
  );
};

const Title = ({ children, size = 80, color = colors.ink, delay = 6, weight = 900, w = 1300 }) => (
  <Reveal delay={delay} y={44}>
    <div style={{ fontFamily: fonts.heading, fontWeight: weight, fontSize: size, color, lineHeight: 1.28, maxWidth: w }}>
      {children}
    </div>
  </Reveal>
);

const Sub = ({ children, delay = 22, size = 40 }) => (
  <Reveal delay={delay} y={28}>
    <div style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: size, color: "#5a6b63", lineHeight: 1.6, marginTop: 22 }}>
      {children}
    </div>
  </Reveal>
);

const Wrap = ({ children, center = true }) => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill
      style={{
        direction: "rtl",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: center ? "center" : "flex-start",
        textAlign: center ? "center" : "right",
        padding: "120px 110px",
        gap: 48,
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

// علامة استفهام تطفو
const Q = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.8 } });
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin((frame - delay) / 12) * 14, fontFamily: fonts.heading, fontWeight: 900, fontSize: size, color: colors.green, opacity: interpolate(s, [0, 1], [0, 0.85]), transform: `scale(${interpolate(s, [0, 1], [0, 1])})` }}>؟</div>
);
};

// ───────── 1. الخطّاف ─────────
const Hook = () => (
  <AbsoluteFill>
    <LightBg />
    <Q x={300} y={250} size={120} delay={20} />
    <Q x={1480} y={300} size={90} delay={30} />
    <Q x={360} y={770} size={84} delay={40} />
    <Q x={1520} y={750} size={130} delay={26} />
    <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Reveal delay={6} y={50}><div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 92, color: colors.ink }}>كم فرصة عمل</div></Reveal>
        <Reveal delay={18} y={50}><div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 168, color: colors.green, lineHeight: 1.05 }}>ضاعت منك؟</div></Reveal>
        <Reveal delay={40} y={30}><div style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: 40, color: "#5a6b63", marginTop: 22 }}>وأنت ما تدري…</div></Reveal>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 2. الحضور المهني ─────────
const Presence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 10, fps, config: { damping: 15, mass: 0.9 } });
  return (
    <AbsoluteFill>
      <LightBg />
      <AbsoluteFill style={{ direction: "rtl", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 100, padding: 110 }}>
        <div style={{ maxWidth: 640 }}>
          <Title size={82}>حضورك المهني<br /><span style={{ color: colors.green }}>على الإنترنت</span></Title>
          <Sub>هو أوّل ما يشوفه صاحب العمل عنك</Sub>
        </div>
        <div style={{ transform: `translateY(${interpolate(s, [0, 1], [70, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`, opacity: s }}>
          <MiniProfile w={420} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── 3. لينكدإن أهم أداة توظيف ─────────
const InHero = ({ delay = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.8 } });
  const pulse = 1 + 0.03 * Math.sin(frame / 9);
  return (
    <div style={{ width: 260, height: 260, borderRadius: 48, background: LINKEDIN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontWeight: 700, fontSize: 150, color: "#fff", boxShadow: "0 30px 70px rgba(10,102,194,0.4)", transform: `scale(${interpolate(s, [0, 1], [0.4, 1]) * pulse})`, opacity: s }}>in</div>
  );
};

const LinkedInIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = interpolate(spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 26 }), [0, 1], [0, 480]);
  return (
    <AbsoluteFill>
      <LightBg />
      <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center", gap: 54 }}>
        <InHero />
        <div style={{ textAlign: "center" }}>
          <Reveal delay={26} y={40}><div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 46, color: colors.green700 }}>منصّة التواصل المهني</div></Reveal>
          <Reveal delay={40} y={40}><div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 92, color: colors.ink, marginTop: 10 }}>أهمّ أداة توظيف في العالم</div></Reveal>
          <div style={{ height: 12, width: line, background: colors.green, borderRadius: 999, margin: "28px auto 0" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── 4. اسم الكورس (هيرو) ─────────
const CourseTitle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });
  return (
    <AbsoluteFill>
      <LightBg />
      <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center", padding: 120 }}>
        <div style={{ transform: `translateY(${interpolate(card, [0, 1], [60, 0])}px) scale(${interpolate(card, [0, 1], [0.9, 1])})`, opacity: card, background: colors.white, borderRadius: radius.lg, boxShadow: "0 40px 90px rgba(11,199,114,0.18)", padding: "80px 90px", textAlign: "center", border: `2px solid ${colors.green100}` }}>
          <Reveal delay={10}><div style={{ display: "inline-block", background: colors.green, color: "#fff", fontFamily: fonts.heading, fontWeight: 700, fontSize: 34, padding: "12px 34px", borderRadius: 999, marginBottom: 36 }}>كورس مِن بيتي</div></Reveal>
          <Reveal delay={18} y={40}><div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 96, color: colors.ink, lineHeight: 1.2 }}>تحسين ملفك الشخصي على</div></Reveal>
          <Reveal delay={30} y={40}><div style={{ fontFamily: fonts.latin, fontWeight: 700, fontSize: 120, color: LINKEDIN, marginTop: 12 }}>LinkedIn</div></Reveal>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── 5. من بروفايل عادي → أداة تجذب الفرص ─────────
const TurnIntoTool = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 60, padding: 90 }}>
      <Title size={70} delay={6} w={1500}>نحوّل حسابك من <span style={{ color: "#9aa6a0" }}>بروفايل عادي</span> إلى <span style={{ color: colors.green }}>أداة تجذب الفرص</span></Title>
      <div style={{ display: "flex", alignItems: "center", gap: 50, direction: "ltr" }}>
        <MiniProfile w={300} dim lift={0} />
        <div style={{ fontSize: 80, color: colors.green }}>→</div>
        <div style={{ position: "relative" }}>
          <MiniProfile w={340} linkedin />
          <div style={{ position: "absolute", top: -30, left: -30 }}><Check size={96} delay={30} /></div>
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 6. البروفايل الاحترافي + عدسة ─────────
const Magnifier = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13 } });
  const sweep = Math.sin(frame / 18) * 26;
  return (
    <div style={{ position: "relative", transform: `translateX(${sweep}px) scale(${interpolate(s, [0, 1], [0.5, 1])})`, opacity: s }}>
      <div style={{ width: 200, height: 200, borderRadius: "50%", border: `14px solid ${colors.green}`, background: "rgba(11,199,114,0.08)" }} />
      <div style={{ position: "absolute", bottom: -50, left: -36, width: 90, height: 26, borderRadius: 14, background: colors.green700, transform: "rotate(45deg)" }} />
    </div>
  );
};
const ProfileRecruiter = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 90, padding: 110 }}>
      <div style={{ maxWidth: 720 }}>
        <Title size={74}>بروفايل احترافي يخلّي <span style={{ color: colors.green }}>مسؤول التوظيف</span> يفهم قيمتك خلال ثوانٍ</Title>
      </div>
      <div style={{ position: "relative" }}>
        <MiniProfile w={360} linkedin />
        <div style={{ position: "absolute", bottom: 40, left: -70 }}><Magnifier delay={16} /></div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 7. Headline & About ─────────
const HeadlineAbout = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 50, padding: 100 }}>
      <Title size={76} delay={6}>تتعلّم تكتب <span style={{ color: LINKEDIN }}>Headline</span> و <span style={{ color: LINKEDIN }}>About</span></Title>
      <Sub delay={18}>كلمات تخلّيك مميّزاً من أول نظرة</Sub>
      <div style={{ display: "flex", gap: 36, marginTop: 16 }}>
        {["Headline", "About"].map((t, i) => (
          <Reveal key={t} delay={26 + i * 10} y={40}>
            <div style={{ width: 460, background: "#fff", borderRadius: radius.sm + 4, boxShadow: "0 16px 40px rgba(14,19,17,0.10)", padding: 36, direction: "rtl" }}>
              <div style={{ fontFamily: fonts.latin, fontWeight: 700, fontSize: 36, color: LINKEDIN, direction: "ltr", textAlign: "right" }}>{t}</div>
              <div style={{ height: 16, width: "90%", background: colors.green100, borderRadius: 8, marginTop: 26 }} />
              <div style={{ height: 16, width: "70%", background: colors.muted, borderRadius: 8, marginTop: 16 }} />
            </div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 8. عرض المهارات ─────────
const ShowcaseSkills = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 54, padding: 110 }}>
      <Title size={80}>تعرض <span style={{ color: colors.green }}>خبراتك ومهاراتك</span> بطريقة احترافية</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 1300 }}>
        {["تصميم", "تسويق", "قيادة فريق", "تحليل بيانات", "كتابة محتوى", "إدارة مشاريع"].map((t, i) => (
          <Reveal key={t} delay={20 + i * 6} y={30}><Chip text={t} big /></Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 9. شبكة العلاقات ─────────
const Network = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center" }}>
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        {[[960, 540, 560, 320], [960, 540, 1360, 360], [960, 540, 520, 760], [960, 540, 1380, 740], [960, 540, 960, 250], [960, 540, 960, 850]].map((l, i) => (
          <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={colors.green100} strokeWidth="4" />
        ))}
      </svg>
      <Node x={960} y={540} r={70} delay={6} />
      <Node x={560} y={320} delay={16} color={LINKEDIN} />
      <Node x={1360} y={360} delay={22} />
      <Node x={520} y={760} delay={28} />
      <Node x={1380} y={740} delay={20} color={LINKEDIN} />
      <Node x={960} y={250} delay={26} />
      <Node x={960} y={850} delay={30} />
      <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center", direction: "rtl" }}>
        <Title size={84} delay={6}>تبني <span style={{ color: colors.green }}>شبكة علاقات</span> قوية</Title>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 10. البحث عن الوظائف ─────────
const JobSearch = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 56, padding: 100 }}>
      <Title size={74}>تبحث عن الوظائف <span style={{ color: colors.green }}>باحتراف</span></Title>
      <Reveal delay={18} y={40}>
        <div style={{ width: 1000, background: "#fff", borderRadius: radius.lg, boxShadow: "0 24px 60px rgba(14,19,17,0.12)", overflow: "hidden" }}>
          <div style={{ height: 70, background: LINKEDIN, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
            <span style={{ color: "#fff", fontFamily: fonts.latin, fontWeight: 700, fontSize: 30 }}>in</span>
            <div style={{ flex: 1, height: 34, background: "rgba(255,255,255,0.85)", borderRadius: 999, marginInline: 20 }} />
          </div>
          <div style={{ padding: 34, display: "flex", gap: 22 }}>
            {[colors.green50, colors.muted, colors.green50].map((c, i) => (
              <div key={i} style={{ flex: 1, height: 200, background: c, borderRadius: 14, border: `2px solid ${colors.border}` }} />
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={34}><Chip text="LinkedIn Search  ·  Boolean Search" accent={LINKEDIN} bg="#eaf2fc" fg={LINKEDIN} big /></Reveal>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 11. أدوات الذكاء الاصطناعي ─────────
const AITools = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 56, padding: 100 }}>
      <Title size={74}>تستخدم <span style={{ color: colors.green }}>أدوات الذكاء الاصطناعي</span> لتطوير بروفايلك</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 26, justifyContent: "center", maxWidth: 1400 }}>
        {["ChatGPT", "Grammarly", "Resume Worded", "Careerflow", "Taplio"].map((t, i) => (
          <Reveal key={t} delay={20 + i * 7} y={36}>
            <div style={{ background: "#fff", border: `2px solid ${colors.green100}`, borderRadius: radius.pill, padding: "24px 46px", fontFamily: fonts.latin, fontWeight: 700, fontSize: 46, color: colors.ink, boxShadow: "0 12px 30px rgba(14,19,17,0.08)", direction: "ltr" }}>{t}</div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 12. خدمة مطلوبة ─────────
const PaidService = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 56, padding: 90 }}>
      <Title size={74}>وتحوّل المهارة إلى <span style={{ color: colors.green }}>خدمة مطلوبة</span></Title>
      <div style={{ display: "flex", alignItems: "center", gap: 30, position: "relative" }}>
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={18 + i * 8} y={40}><MiniProfile w={280} linkedin lift={i === 1 ? -20 : 0} /></Reveal>
        ))}
        <div style={{ position: "absolute", right: -60, top: -40 }}><Check size={110} delay={42} /></div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 13. دخل حقيقي ─────────
const Coin = ({ delay, lift }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  return (
    <div style={{ width: 150, height: 150, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.green400}, ${colors.green600})`, border: `8px solid ${colors.green100}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.heading, fontWeight: 900, fontSize: 80, color: "#fff", transform: `translateY(${interpolate(s, [0, 1], [80, lift])}px) scale(${interpolate(s, [0, 1], [0, 1])})`, boxShadow: "0 16px 40px rgba(11,199,114,0.4)" }}>﷼</div>
  );
};
const RealIncome = () => (
  <AbsoluteFill>
    <LightBg />
    <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 70, padding: 100 }}>
      <Title size={78}>تستخدم لينكدإن لصالحك… وتحقّق منه <span style={{ color: colors.green }}>دخلاً حقيقياً</span></Title>
      <div style={{ display: "flex", gap: 36, alignItems: "flex-end" }}>
        <Coin delay={16} lift={0} />
        <Coin delay={24} lift={-40} />
        <Coin delay={32} lift={-80} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ───────── 14. المدرّبة ─────────
const Instructor = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });
  return (
    <AbsoluteFill>
      <LightBg />
      <AbsoluteFill style={{ direction: "rtl", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 90, padding: 110 }}>
        <div style={{ maxWidth: 720 }}>
          <Reveal delay={6}><div style={{ display: "inline-block", background: colors.green50, color: colors.green700, fontFamily: fonts.heading, fontWeight: 700, fontSize: 34, padding: "12px 32px", borderRadius: 999, marginBottom: 26 }}>مدرّبة الكورس</div></Reveal>
          <Title size={92} delay={12}>د. سارة وجدي</Title>
          <Sub delay={22} size={38}>مدرّبة مهارات حياتية وكوتش مهني، متخصّصة في:</Sub>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 26 }}>
            {["Interview Skills", "CV Writing", "LinkedIn Optimization"].map((t, i) => (
              <Reveal key={t} delay={30 + i * 7}><div style={{ background: "#fff", border: `2px solid ${colors.green100}`, borderRadius: 999, padding: "14px 30px", fontFamily: fonts.latin, fontWeight: 600, fontSize: 32, color: colors.green700, direction: "ltr" }}>{t}</div></Reveal>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", width: 520, height: 760, borderRadius: radius.lg, overflow: "hidden", boxShadow: "0 30px 80px rgba(14,19,17,0.18)", transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`, opacity: s, background: colors.green50 }}>
          <Img src={staticFile("gen/instructor.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: `linear-gradient(to top, ${colors.green}, rgba(11,199,114,0))` }} />
          <div style={{ position: "absolute", bottom: 34, right: 34, color: "#fff", fontFamily: fonts.heading, fontWeight: 800, fontSize: 44, direction: "rtl" }}>د. سارة وجدي</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── 15. لو تبي حضور مهني ─────────
const ProPresence = () => (
  <Wrap>
    <Title size={86}>لو تبي <span style={{ color: colors.green }}>حضوراً مهنياً</span> يخلّي الفرص تلاقيك…</Title>
  </Wrap>
);

// ───────── 16. الدعوة ─────────
const Thumb = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.8 } });
  const wob = Math.sin(frame / 10) * 4;
  return (
    <div style={{ transform: `scale(${interpolate(s, [0, 1], [0, 1])}) rotate(${wob}deg)`, color: colors.green }}>
      <svg width="170" height="170" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21h3V9H2v12zM23 10c0-1.1-.9-2-2-2h-6.3l1-4.6.03-.3c0-.4-.2-.8-.4-1.1L14.2 1 7.6 7.6c-.4.4-.6.9-.6 1.4v9c0 1.1.9 2 2 2h9c.8 0 1.5-.5 1.8-1.2l3-7c.1-.2.1-.5.1-.8v-1z" /></svg>
    </div>
  );
};
const CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btn = spring({ frame: frame - 40, fps, config: { damping: 12, mass: 0.8 } });
  const pulse = 1 + 0.03 * Math.sin(frame / 8);
  return (
    <AbsoluteFill>
      <LightBg />
      <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 44, padding: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Thumb delay={6} />
          <div style={{ width: 130, height: 130, borderRadius: 28, background: LINKEDIN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fonts.latin, fontWeight: 700, fontSize: 78 }}>in</div>
        </div>
        <Title size={92} delay={16}>اشترك الآن… <span style={{ color: colors.green }}>وابدأ رحلتك</span></Title>
        <Reveal delay={28}><div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 50, color: colors.green700 }}>إلى LinkedIn احترافي</div></Reveal>
        <div style={{ transform: `scale(${interpolate(btn, [0, 1], [0.6, 1]) * pulse})`, opacity: btn, background: colors.green, color: "#fff", fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, padding: "30px 84px", borderRadius: 999, boxShadow: "0 20px 50px rgba(11,199,114,0.45)", marginTop: 10 }}>سجّل في الكورس الآن</div>
        <Reveal delay={54}><div style={{ fontFamily: fonts.latin, fontWeight: 600, fontSize: 44, color: colors.green700, direction: "ltr", marginTop: 6 }}>mnbety.com</div></Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── التكوين الكامل ─────────
const S = ({ from, dur, children }) => (
  <Sequence from={from} durationInFrames={dur}>{children}</Sequence>
);

export const MnbetyCareer = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.green }}>
      <Audio src={staticFile("gen/career-audio.wav")} />

      <S from={0} dur={245}><Hook /></S>
      <S from={240} dur={155}><Presence /></S>
      <S from={390} dur={215}><LinkedInIntro /></S>
      <S from={600} dur={185}><CourseTitle /></S>
      <S from={780} dur={245}><TurnIntoTool /></S>
      <S from={1020} dur={125}><ProfileRecruiter /></S>
      <S from={1140} dur={125}><HeadlineAbout /></S>
      <S from={1260} dur={125}><ShowcaseSkills /></S>
      <S from={1380} dur={125}><Network /></S>
      <S from={1500} dur={245}><JobSearch /></S>
      <S from={1740} dur={125}><AITools /></S>
      <S from={1860} dur={245}><PaidService /></S>
      <S from={2100} dur={245}><RealIncome /></S>
      <S from={2340} dur={365}><Instructor /></S>
      <S from={2700} dur={125}><ProPresence /></S>
      <S from={2820} dur={240}><CTA /></S>

      {[600, 780, 1500, 2100, 2340, 2820].map((t) => (
        <GreenWipe key={t} start={t - 11} dur={22} />
      ))}

      <LogoBug />
    </AbsoluteFill>
  );
};
