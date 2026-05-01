import React, { useState, useMemo } from "react";
import Head from "next/head";
import { Heart, Instagram, Star, Menu, X, Check, ChevronRight, ChevronLeft, Sparkles, Award, MapPin } from "lucide-react";

import PRICES from "../data/prices.json";
import SPECIAL from "../data/special.json";
import TESTIMONIALS from "../data/testimonials.json";

// ============================================================
// BRAND CONSTANTS
// ============================================================
const PINK = "#FF1493";
const PINK_SOFT = "#F4C0D1";
const PINK_DEEP = "#d10070";
const BLACK = "#0a0508";
const BLACK_CARD = "rgba(20, 8, 13, 0.85)";
const CREAM = "#FFF6F2";
const ROSE = "#D4869B";
const BURGUNDY = "#7A3B4F";

const SCRIPT = "'Brush Script MT', 'Lucida Handwriting', cursive";
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const LEOPARD_BG =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cellipse cx='25' cy='20' rx='13' ry='8' fill='%23FF1493' opacity='0.22'/%3E%3Cellipse cx='25' cy='20' rx='6' ry='3.5' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='90' cy='35' rx='15' ry='9' fill='%23FF1493' opacity='0.2'/%3E%3Cellipse cx='90' cy='35' rx='7' ry='4.5' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='135' cy='15' rx='10' ry='7' fill='%23FF1493' opacity='0.22'/%3E%3Cellipse cx='135' cy='15' rx='4.5' ry='3' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='15' cy='75' rx='12' ry='7' fill='%23FF1493' opacity='0.2'/%3E%3Cellipse cx='15' cy='75' rx='5' ry='3' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='65' cy='90' rx='14' ry='9' fill='%23FF1493' opacity='0.22'/%3E%3Cellipse cx='65' cy='90' rx='6' ry='4' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='115' cy='95' rx='12' ry='8' fill='%23FF1493' opacity='0.2'/%3E%3Cellipse cx='115' cy='95' rx='5.5' ry='3.5' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='40' cy='130' rx='11' ry='7' fill='%23FF1493' opacity='0.22'/%3E%3Cellipse cx='40' cy='130' rx='5' ry='3' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='140' cy='140' rx='10' ry='7' fill='%23FF1493' opacity='0.2'/%3E%3Cellipse cx='140' cy='140' rx='4.5' ry='3' fill='%23000' opacity='0.85'/%3E%3Cellipse cx='90' cy='145' rx='9' ry='6' fill='%23FF1493' opacity='0.22'/%3E%3Cellipse cx='90' cy='145' rx='4' ry='2.5' fill='%23000' opacity='0.85'/%3E%3C/svg%3E")`;

const LEOPARD_STRIP =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='16' viewBox='0 0 120 16'%3E%3Cellipse cx='15' cy='8' rx='6' ry='3' fill='%23D4869B' opacity='0.5'/%3E%3Cellipse cx='15' cy='8' rx='2.5' ry='1.3' fill='%237A3B4F' opacity='0.75'/%3E%3Cellipse cx='50' cy='8' rx='7' ry='3.5' fill='%23D4869B' opacity='0.5'/%3E%3Cellipse cx='50' cy='8' rx='3' ry='1.5' fill='%237A3B4F' opacity='0.75'/%3E%3Cellipse cx='90' cy='8' rx='6' ry='3' fill='%23D4869B' opacity='0.5'/%3E%3Cellipse cx='90' cy='8' rx='2.5' ry='1.3' fill='%237A3B4F' opacity='0.75'/%3E%3C/svg%3E")`;

const POLICIES = {
  fixes: [
    "Within 24hrs of having your lashes done, if any fall out for any reason, dm me & i will gladly fill them back in for you at no cost.",
    "However, if you wet, rub, sleep on them, wear makeup, or apply any type of oil within the first 24 hours of getting your lashes done, it may affect retention. I'd be happy to fill them in for you, but it would be at an additional charge.",
    "To maintain the health of your natural lashes, please avoid picking or pulling your extensions. Damaged natural lashes may prevent me from completing a fill service.",
  ],
  reminder:
    "Please come to your appointment with clean lashes. I always wash them before we start, but arriving with fresh, clean lashes helps with better retention and flawless application.",
  aftercare: [
    "Do not wet lashes for the first 24hrs",
    "Brush 2x daily",
    "No mascara",
    "Avoid all oil based products",
    "Don't pull or rub on your lashes",
    "Keep lashes clean (wash 2x a day: Morning & Night)",
    "Avoid steam, saunas, and excessive heat (can weaken the adhesive)",
    "No lash curlers!",
    "Sleep on your back or side when possible (avoid sleeping on lashes)",
    "Come to fill appointments with clean lashes (no makeup or buildup)",
    "Lash retention may vary based on your natural lash cycle and how well aftercare instructions are followed.",
    "Proper aftercare is essential for maintaining your lashes and overall results.",
  ],
  payments: [
    "$20 non-refundable deposit is required to secure your appointment (goes towards your total cost). No deposit, no appointment.",
    "Remaining payments can be made through Cashapp or Cash. If paying through Apple Pay or Zelle, there is an additional $5.00 fee.",
  ],
  beforeAppt: [
    "No caffeine, makeup, sunscreen or moisturizer for best results.",
    "Restroom access is not provided. Clients are asked to use the restroom prior to their appointment.",
    "I'm home-based & have pets — so please let me know if you have any allergies beforehand.",
  ],
  fills: [
    "Fills must have at least 60% of lash extensions remaining.",
    "Fills must be scheduled within 2-3 weeks of your previous appointment.",
    "Anything past 3 weeks or under 60% retention will be considered a full set. No exceptions.",
  ],
  booking: [
    "I take about 3-3 1/2 hours so please book with time in mind",
    "Appointments start at 10am (early morning appointments between 8:30 am and 9:30 am)",
    "After-hours appointments (after 5:00 pm) are available for an additional $15 fee.",
    "Same-day appointments are available by approval only. If approved, a $20 same-day fee will apply.",
    "No extra guests please. No exceptions.",
    "Need to reschedule? Just let me know 24 hrs before your appointment (keep in mind, I will need another deposit in order to re-book)",
  ],
};

// ============================================================
// HELPERS
// ============================================================
function getDaysLeft(endDate) {
  const end = new Date(endDate);
  const now = new Date();
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

function getDiscountedPrice(price, id) {
  if (!SPECIAL.active || !SPECIAL.appliesTo.includes(id)) return null;
  if (SPECIAL.type === "percent") return Math.round(price * (1 - SPECIAL.value / 100));
  if (SPECIAL.type === "fixed") return price - SPECIAL.value;
  if (SPECIAL.type === "flat") return Math.min(price, SPECIAL.value);
  return null;
}

function calculateTotal(b) {
  const stylePrice = b.style?.price || 0;
  const addOnTotal = (b.addOns || []).reduce((s, a) => s + a.price, 0);
  let subtotal = stylePrice + addOnTotal;
  let discount = 0;
  if (b.style) {
    const newPrice = getDiscountedPrice(stylePrice, b.style.id);
    if (newPrice !== null) discount = stylePrice - newPrice;
  }
  let fees = 0;
  if (b.timeWindow === "evening") fees += 15;
  if (b.sameDay) fees += 20;
  return { subtotal, discount, fees, total: subtotal - discount + fees };
}

function buildDmMessage(b, t) {
  const lines = ["Hi Mariee! Just submitted a booking request ♡"];
  if (b.style) lines.push(`Service: ${b.style.name}`);
  if (b.addOns?.length) lines.push(`Add-ons: ${b.addOns.map((a) => a.name).join(", ")}`);
  if (t.discount > 0) lines.push(`${SPECIAL.label} applied: -$${t.discount}`);
  if (b.timeWindow === "evening") lines.push(`After-hours fee: +$15`);
  if (b.sameDay) lines.push(`Same-day fee: +$20`);
  lines.push(`Total: $${t.total}`);
  if (b.date1) lines.push(`Preferred date: ${b.date1}`);
  if (b.firstTime === "yes") lines.push(`First-time client!`);
  lines.push(`Sending my $20 deposit now to secure ♡`);
  return lines.join("\n");
}

function igDmUrl(message) {
  return `https://ig.me/m/luxlashesbymariee?text=${encodeURIComponent(message)}`;
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function Banner({ onClose }) {
  if (!SPECIAL.active) return null;
  const days = getDaysLeft(SPECIAL.endDate);
  const showCountdown = days <= 7 && days > 0;
  return (
    <div
      className="relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold tracking-wide"
      style={{ background: `linear-gradient(90deg, ${PINK}, #FF69B4, ${PINK})`, color: BLACK }}
    >
      <Heart size={11} fill={BLACK} stroke={BLACK} />
      <span className="text-center">
        {SPECIAL.headerMessage}
        {showCountdown && ` · ${days} DAY${days === 1 ? "" : "S"} LEFT`}
      </span>
      <Heart size={11} fill={BLACK} stroke={BLACK} />
      <button onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}

function Nav({ page, onNav, theme = "bold" }) {
  const isBold = theme === "bold";
  const [open, setOpen] = useState(false);
  const navStyle = isBold
    ? { background: BLACK, color: PINK_SOFT, borderBottom: `1px solid rgba(255,20,147,0.3)` }
    : { background: CREAM, color: BURGUNDY, borderBottom: `1px solid rgba(212,134,155,0.3)` };
  const NavLink = ({ id, label }) => (
    <button
      onClick={() => { onNav(id); setOpen(false); }}
      className="px-3 py-1 text-xs uppercase tracking-widest font-semibold"
      style={{ opacity: page === id ? 1 : 0.65, color: isBold ? (page === id ? PINK : PINK_SOFT) : BURGUNDY }}
    >
      {label}
    </button>
  );
  return (
    <nav className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={navStyle}>
      <button onClick={() => onNav("home")} className="flex items-center gap-1">
        <span style={{ fontFamily: isBold ? SCRIPT : SERIF, fontSize: 22, lineHeight: 1, color: isBold ? PINK : BURGUNDY, textShadow: isBold ? `0 0 8px rgba(255,20,147,0.6)` : "none" }}>
          LuxLashes
        </span>
        <Heart size={11} fill={isBold ? PINK : ROSE} stroke={isBold ? PINK : ROSE} />
      </button>
      <div className="hidden sm:flex items-center gap-1">
        <NavLink id="home" label="Home" />
        <NavLink id="book" label="Book" />
        <NavLink id="policies" label="Policies" />
      </div>
      <button className="sm:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="sm:hidden absolute top-full left-0 right-0 flex flex-col py-2" style={navStyle}>
          <NavLink id="home" label="Home" />
          <NavLink id="book" label="Book" />
          <NavLink id="policies" label="Policies" />
        </div>
      )}
    </nav>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: SCRIPT, color: PINK, fontSize: 36, lineHeight: 1, textShadow: `0 0 10px rgba(255,20,147,0.7)` }}>
      <Sparkles size={11} style={{ color: "#fff", filter: `drop-shadow(0 0 3px ${PINK})` }} />
      {children}
      <Sparkles size={11} style={{ color: "#fff", filter: `drop-shadow(0 0 3px ${PINK})` }} />
    </h2>
  );
}

function HeartDivider() {
  return <div className="text-center py-3 tracking-[0.6em]" style={{ color: PINK, opacity: 0.7 }}>♡ ♡ ♡</div>;
}

function Footer() {
  return (
    <footer className="px-6 py-8 text-center text-xs opacity-60" style={{ borderTop: `1px solid rgba(255,20,147,0.2)` }}>
      <p className="mb-1">♡ LuxLashes by Mariee · Montebello, CA ♡</p>
      <p>All sales & payments through Instagram DMs</p>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ onNav }) {
  return (
    <div style={{ backgroundColor: BLACK, backgroundImage: LEOPARD_BG, backgroundSize: "200px 200px", color: PINK_SOFT, minHeight: "100vh" }}>
      <section className="relative overflow-hidden px-6 pt-12 pb-16 text-center border-b" style={{ borderColor: "rgba(255,20,147,0.3)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles size={12} style={{ color: "#fff" }} />
          <Heart size={10} fill={PINK} stroke={PINK} />
          <Sparkles size={12} style={{ color: "#fff" }} />
        </div>
        <h1 style={{ fontFamily: SCRIPT, color: PINK, fontSize: "clamp(56px, 14vw, 96px)", lineHeight: 0.95, textShadow: `0 0 14px rgba(255,20,147,0.8), 0 0 28px rgba(255,20,147,0.5)`, margin: "8px 0" }}>
          Lux Lashes
        </h1>
        <p className="text-xs tracking-[0.4em] mt-2 mb-1" style={{ color: PINK_SOFT }}>BY MARIEE</p>
        <div className="flex items-center justify-center gap-1.5 text-xs mb-8 opacity-80">
          <MapPin size={10} />
          <span className="tracking-wider">MONTEBELLO, CA</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => onNav("book")} className="px-7 py-3 text-xs font-bold tracking-widest" style={{ background: PINK, color: BLACK, boxShadow: `0 0 14px rgba(255,20,147,0.6)`, border: `1px solid ${PINK}` }}>
            BOOK NOW ♡
          </button>
          <a href="#gallery" className="px-7 py-3 text-xs font-bold tracking-widest" style={{ background: "transparent", color: PINK, border: `1px solid ${PINK}` }}>
            SEE GALLERY
          </a>
        </div>
      </section>

      <section className="px-6 py-12 max-w-2xl mx-auto">
        <SectionTitle>Price List</SectionTitle>
        <PriceTable group="Full Sets" items={PRICES.fullSets} />
        <PriceTable group="Fills" items={PRICES.fills} />
        <PriceTable group="Add-Ons" items={PRICES.addOns} />
        <p className="text-xs italic text-center mt-4 opacity-70">
          ♡ Deposit via DM. Balance in Cash or Cashapp. Apple Pay/Zelle adds $5 ♡
        </p>
      </section>

      <HeartDivider />

      <section id="gallery" className="px-6 py-12 max-w-3xl mx-auto">
        <SectionTitle>Gallery</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, #2a1018, #14080d)`, border: `1px solid rgba(255,20,147,0.25)` }}>
              <img src={`/gallery/lash-${i + 1}.jpg`} alt="" className="w-full h-full object-cover" style={{ objectPosition: "center top" }} />
            </div>
          ))}
        </div>
      </section>

      <HeartDivider />

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <SectionTitle>What Clients Say</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </section>

      <HeartDivider />

      <section className="px-6 py-12 max-w-3xl mx-auto text-center">
        <SectionTitle>Follow on Instagram</SectionTitle>
        <a href="https://instagram.com/luxlashesbymariee" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-6 text-sm font-semibold tracking-wider" style={{ color: PINK }}>
          <Instagram size={18} />
          @luxlashesbymariee
        </a>
      </section>

      <HeartDivider />

      <section className="px-6 py-12 max-w-xl mx-auto">
        <SectionTitle>Certified</SectionTitle>
        <CertGallery />
      </section>

      <section className="px-6 py-16 text-center" style={{ background: "rgba(255,20,147,0.08)" }}>
        <p style={{ fontFamily: SCRIPT, fontSize: 36, color: PINK, lineHeight: 1, textShadow: `0 0 10px rgba(255,20,147,0.7)` }}>Ready for your set?</p>
        <p className="text-xs tracking-widest mt-2 mb-6 opacity-80">BOOK YOUR APPOINTMENT TODAY</p>
        <button onClick={() => onNav("book")} className="px-10 py-4 text-sm font-bold tracking-widest" style={{ background: PINK, color: BLACK, boxShadow: `0 0 16px rgba(255,20,147,0.7)` }}>
          BOOK NOW ♡
        </button>
      </section>

      <Footer />
    </div>
  );
}

function PriceTable({ group, items }) {
  return (
    <div className="mb-6">
      <h3 className="text-center mb-3" style={{ fontFamily: SCRIPT, color: PINK, fontSize: 24, textShadow: `0 0 6px rgba(255,20,147,0.5)` }}>{group}</h3>
      <div className="px-5 py-4" style={{ background: BLACK_CARD, border: `1px solid rgba(255,20,147,0.3)` }}>
        {items.map((it) => {
          const newPrice = getDiscountedPrice(it.price, it.id);
          const discounted = newPrice !== null;
          return (
            <div key={it.id} className="flex items-center justify-between py-1.5 text-sm italic">
              <span className="flex items-center gap-2">
                <Heart size={9} fill={PINK} stroke={PINK} />
                {it.name}
              </span>
              <span className="font-bold not-italic" style={{ color: PINK }}>
                {discounted && <span className="line-through opacity-50 mr-2 font-normal">${it.price}</span>}
                ${newPrice ?? it.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestimonialCard({ name, service, rating, quote }) {
  return (
    <div className="relative p-4 text-sm italic" style={{ background: BLACK_CARD, border: `1px solid rgba(255,20,147,0.4)` }}>
      <Heart size={11} fill={PINK} stroke={PINK} className="absolute top-2 right-2" />
      <div className="flex gap-0.5 mb-2" style={{ color: PINK }}>
        {Array.from({ length: rating }).map((_, i) => <Star key={i} size={11} fill={PINK} stroke={PINK} />)}
      </div>
      <p className="mb-3 leading-relaxed">"{quote}"</p>
      <p className="text-[10px] not-italic font-bold tracking-widest" style={{ color: PINK }}>
        — {name.toUpperCase()} · {service.toUpperCase()}
      </p>
    </div>
  );
}

function CertGallery() {
  const [idx, setIdx] = useState(0);
  const certs = ["/certs/cert-1.jpg", "/certs/cert-2.jpg", "/certs/cert-3.jpg"];
  const prev = () => setIdx((idx - 1 + certs.length) % certs.length);
  const next = () => setIdx((idx + 1) % certs.length);
  return (
    <div className="relative">
      <div className="aspect-[4/3] relative overflow-hidden" style={{ background: "#fff", border: `1px solid rgba(255,20,147,0.4)`, boxShadow: `0 0 18px rgba(255,20,147,0.25)` }}>
        <img src={certs[idx]} alt="" className="w-full h-full object-cover" />
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2" style={{ background: "rgba(255,20,147,0.85)", color: BLACK }} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2" style={{ background: "rgba(255,20,147,0.85)", color: BLACK }} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {certs.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className="w-2.5 h-2.5 rounded-full" style={{ background: i === idx ? PINK : "rgba(255,20,147,0.3)", boxShadow: i === idx ? `0 0 6px ${PINK}` : "none" }} aria-label={`Cert ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// BOOKING PAGE
// ============================================================
function BookPage({ onNav }) {
  const [step, setStep] = useState(1);
  const [b, setB] = useState({
    name: "", instagram: "", phone: "",
    serviceType: "set", style: null, addOns: [],
    date1: "", date2: "", timeWindow: "morning", sameDay: false,
    firstTime: "no", allergies: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const totals = useMemo(() => calculateTotal(b), [b]);
  const dmMessage = useMemo(() => buildDmMessage(b, totals), [b, totals]);
  const stylesAvailable = b.serviceType === "set" ? PRICES.fullSets : PRICES.fills;

  function toggleAddOn(addOn) {
    setB((p) => {
      const exists = p.addOns.find((a) => a.id === addOn.id);
      return { ...p, addOns: exists ? p.addOns.filter((a) => a.id !== addOn.id) : [...p.addOns, addOn] };
    });
  }

  function canProceed() {
    if (step === 1) return b.name.trim() && b.instagram.trim();
    if (step === 2) return !!b.style;
    if (step === 3) return !!b.date1;
    if (step === 4) return b.allergies.trim().length > 0;
    return true;
  }

  async function handleSubmit() {
    if (!canProceed()) return;
    // Submit to Netlify Forms
    const formData = new FormData();
    formData.append("form-name", "booking");
    formData.append("name", b.name);
    formData.append("instagram", b.instagram);
    formData.append("phone", b.phone);
    formData.append("service", b.style?.name || "");
    formData.append("addons", b.addOns.map(a => a.name).join(", "));
    formData.append("date1", b.date1);
    formData.append("date2", b.date2);
    formData.append("timeWindow", b.timeWindow);
    formData.append("sameDay", b.sameDay ? "Yes" : "No");
    formData.append("firstTime", b.firstTime);
    formData.append("allergies", b.allergies);
    formData.append("notes", b.notes);
    formData.append("total", `$${totals.total}`);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
    } catch (e) {
      console.error("Form submission error:", e);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: BLACK, backgroundImage: LEOPARD_BG, backgroundSize: "200px 200px", color: PINK_SOFT, minHeight: "100vh" }} className="px-6 py-16 flex flex-col items-center justify-center text-center">
        <Heart size={60} fill={PINK} stroke={PINK} style={{ filter: `drop-shadow(0 0 12px ${PINK})` }} />
        <h2 className="mt-6" style={{ fontFamily: SCRIPT, color: PINK, fontSize: 48, lineHeight: 1, textShadow: `0 0 12px rgba(255,20,147,0.7)` }}>Almost done!</h2>
        <p className="text-sm tracking-widest mt-3 mb-6 opacity-80">FINAL STEP</p>
        <div className="max-w-md w-full p-5 mb-6 text-left text-xs italic leading-relaxed" style={{ background: BLACK_CARD, border: `1px solid rgba(255,20,147,0.4)`, whiteSpace: "pre-line" }}>
          {dmMessage}
        </div>
        <p className="text-sm mb-6 max-w-md leading-relaxed">
          Tap below to send this message + your <strong style={{ color: PINK }}>$20 deposit</strong> to Mariee on Instagram. She'll confirm your appointment in DMs.
        </p>
        <a href={igDmUrl(dmMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest" style={{ background: PINK, color: BLACK, boxShadow: `0 0 16px rgba(255,20,147,0.7)` }}>
          <Instagram size={18} />
          OPEN INSTAGRAM ♡
        </a>
        <button onClick={() => onNav("home")} className="mt-6 text-xs underline opacity-70">Back to home</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: BLACK, backgroundImage: LEOPARD_BG, backgroundSize: "200px 200px", color: PINK_SOFT, minHeight: "100vh" }} className="px-6 py-10">
      <div className="max-w-md mx-auto">
        <SectionTitle>Book Your Appt</SectionTitle>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-1 h-1 rounded" style={{ background: n <= step ? PINK : "#2a1018", boxShadow: n <= step ? `0 0 4px ${PINK}` : "none" }} />
          ))}
        </div>
        <p className="text-center text-xs tracking-widest opacity-70 mb-6">STEP {step} OF 4</p>

        {step === 1 && (
          <div className="space-y-4">
            <FormLabel>Your Name *</FormLabel>
            <FormInput value={b.name} onChange={(v) => setB({ ...b, name: v })} placeholder="First & last" />
            <FormLabel>Instagram Handle *</FormLabel>
            <FormInput value={b.instagram} onChange={(v) => setB({ ...b, instagram: v })} placeholder="@yourhandle" />
            <FormLabel>Phone (optional)</FormLabel>
            <FormInput value={b.phone} onChange={(v) => setB({ ...b, phone: v })} placeholder="(555) 555-5555" />
            <p className="text-[10px] italic opacity-60 leading-relaxed">♡ Your IG handle is how Mariee will reach you. Make sure it's correct.</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormLabel>Service Type *</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: "set", label: "Full Set" }, { id: "fill", label: "Fill" }].map((opt) => (
                <button key={opt.id} onClick={() => setB({ ...b, serviceType: opt.id, style: null })} className="py-3 text-xs font-bold tracking-widest" style={{ background: b.serviceType === opt.id ? PINK : "transparent", color: b.serviceType === opt.id ? BLACK : PINK, border: `1px solid ${PINK}` }}>
                  {opt.label.toUpperCase()}
                </button>
              ))}
            </div>
            <FormLabel>Lash Style *</FormLabel>
            <div className="space-y-2">
              {stylesAvailable.map((s) => {
                const selected = b.style?.id === s.id;
                const dp = getDiscountedPrice(s.price, s.id);
                const discounted = dp !== null;
                const newPrice = dp ?? s.price;
                return (
                  <button key={s.id} onClick={() => setB({ ...b, style: s })} className="w-full flex justify-between items-center px-4 py-3 text-sm" style={{ background: selected ? `rgba(255,20,147,0.2)` : BLACK_CARD, border: `1px solid ${selected ? PINK : "rgba(255,20,147,0.3)"}`, color: PINK_SOFT }}>
                    <span className="italic flex items-center gap-2">
                      <Heart size={9} fill={selected ? PINK : "transparent"} stroke={PINK} strokeWidth={2} />
                      {s.name}
                    </span>
                    <span className="font-bold" style={{ color: PINK }}>
                      {discounted && <span className="line-through opacity-50 mr-1 font-normal">${s.price}</span>}
                      ${newPrice}
                    </span>
                  </button>
                );
              })}
            </div>
            <FormLabel>Add-Ons (optional)</FormLabel>
            <div className="space-y-2">
              {PRICES.addOns.map((a) => {
                const selected = b.addOns.find((x) => x.id === a.id);
                return (
                  <button key={a.id} onClick={() => toggleAddOn(a)} className="w-full flex justify-between items-center px-4 py-2.5 text-sm italic" style={{ background: selected ? `rgba(255,20,147,0.2)` : BLACK_CARD, border: `1px solid ${selected ? PINK : "rgba(255,20,147,0.3)"}`, color: PINK_SOFT }}>
                    <span className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center" style={{ width: 14, height: 14, background: selected ? PINK : "transparent", border: `1px solid ${PINK}` }}>
                        {selected && <Check size={10} stroke={BLACK} strokeWidth={3} />}
                      </span>
                      {a.name}
                    </span>
                    <span className="not-italic font-bold" style={{ color: PINK }}>+${a.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-[11px] italic opacity-80 leading-relaxed mb-2">♡ Service takes 3 to 3.5 hours — please book with time in mind.</p>
            <FormLabel>Preferred Date *</FormLabel>
            <FormInput type="date" value={b.date1} onChange={(v) => setB({ ...b, date1: v })} />
            <FormLabel>Backup Date (optional)</FormLabel>
            <FormInput type="date" value={b.date2} onChange={(v) => setB({ ...b, date2: v })} />
            <FormLabel>Time Window *</FormLabel>
            <div className="space-y-2">
              {[
                { id: "early", label: "Early Morning · 8:30–9:30 AM" },
                { id: "morning", label: "Morning · 10 AM start" },
                { id: "afternoon", label: "Afternoon · 12–4 PM" },
                { id: "evening", label: "After Hours · After 5 PM (+$15)" },
              ].map((opt) => (
                <button key={opt.id} onClick={() => setB({ ...b, timeWindow: opt.id })} className="w-full text-left px-4 py-2.5 text-xs italic" style={{ background: b.timeWindow === opt.id ? `rgba(255,20,147,0.2)` : BLACK_CARD, border: `1px solid ${b.timeWindow === opt.id ? PINK : "rgba(255,20,147,0.3)"}`, color: PINK_SOFT }}>
                  ♡ {opt.label}
                </button>
              ))}
            </div>
            <button onClick={() => setB({ ...b, sameDay: !b.sameDay })} className="w-full flex items-center gap-2 px-4 py-3 text-xs italic mt-2" style={{ background: b.sameDay ? `rgba(255,20,147,0.2)` : BLACK_CARD, border: `1px solid ${b.sameDay ? PINK : "rgba(255,20,147,0.3)"}`, color: PINK_SOFT }}>
              <span className="inline-flex items-center justify-center" style={{ width: 14, height: 14, background: b.sameDay ? PINK : "transparent", border: `1px solid ${PINK}`, flexShrink: 0 }}>
                {b.sameDay && <Check size={10} stroke={BLACK} strokeWidth={3} />}
              </span>
              Same-day appt request (+$20, by Mariee's approval)
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <FormLabel>Allergies / Sensitivities *</FormLabel>
            <FormInput value={b.allergies} onChange={(v) => setB({ ...b, allergies: v })} placeholder="None, or list anything Mariee should know" multiline />
            <p className="text-[10px] italic opacity-70 leading-relaxed -mt-2">♡ Mariee is home-based with pets. Please disclose any allergies.</p>
            <FormLabel>Is this your first appointment with Mariee?</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: "yes", label: "Yes" }, { id: "no", label: "No" }].map((opt) => (
                <button key={opt.id} onClick={() => setB({ ...b, firstTime: opt.id })} className="py-2.5 text-xs font-bold tracking-widest" style={{ background: b.firstTime === opt.id ? PINK : "transparent", color: b.firstTime === opt.id ? BLACK : PINK, border: `1px solid ${PINK}` }}>
                  {opt.label.toUpperCase()}
                </button>
              ))}
            </div>
            <FormLabel>Anything Else? (optional)</FormLabel>
            <FormInput value={b.notes} onChange={(v) => setB({ ...b, notes: v })} placeholder="Notes for Mariee" multiline />
          </div>
        )}

        {b.style && (
          <div className="mt-8 p-4" style={{ background: `linear-gradient(135deg, ${PINK}, ${PINK_DEEP})`, color: BLACK, border: `1px solid ${PINK}`, boxShadow: `0 0 12px rgba(255,20,147,0.4)` }}>
            <div className="flex justify-between text-xs font-bold py-1">
              <span>♡ {b.style.name}</span>
              <span>${b.style.price}</span>
            </div>
            {b.addOns.map((a) => (
              <div key={a.id} className="flex justify-between text-xs font-bold py-1">
                <span>♡ {a.name}</span>
                <span>+${a.price}</span>
              </div>
            ))}
            {totals.discount > 0 && (
              <div className="flex justify-between text-xs font-bold py-1">
                <span>♡ {SPECIAL.label}</span>
                <span>−${totals.discount}</span>
              </div>
            )}
            {b.timeWindow === "evening" && <div className="flex justify-between text-xs font-bold py-1"><span>♡ After-hours fee</span><span>+$15</span></div>}
            {b.sameDay && <div className="flex justify-between text-xs font-bold py-1"><span>♡ Same-day fee</span><span>+$20</span></div>}
            <div className="flex justify-between font-black text-base pt-2 mt-2 border-t border-black">
              <span>TOTAL</span>
              <span>${totals.total}</span>
            </div>
          </div>
        )}

        <p className="text-[10px] italic text-center opacity-70 mt-3">♡ $20 deposit due via Instagram DM to secure ♡</p>

        <div className="flex gap-2 mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 py-3 text-xs font-bold tracking-widest flex items-center justify-center gap-1" style={{ background: "transparent", color: PINK, border: `1px solid ${PINK}` }}>
              <ChevronLeft size={14} /> BACK
            </button>
          )}
          {step < 4 && (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} className="flex-1 py-3 text-xs font-bold tracking-widest flex items-center justify-center gap-1" style={{ background: canProceed() ? PINK : "rgba(255,20,147,0.3)", color: BLACK, cursor: canProceed() ? "pointer" : "not-allowed", boxShadow: canProceed() ? `0 0 10px rgba(255,20,147,0.5)` : "none" }}>
              NEXT <ChevronRight size={14} />
            </button>
          )}
          {step === 4 && (
            <button onClick={handleSubmit} disabled={!canProceed()} className="flex-1 py-3 text-xs font-bold tracking-widest" style={{ background: canProceed() ? PINK : "rgba(255,20,147,0.3)", color: BLACK, cursor: canProceed() ? "pointer" : "not-allowed", boxShadow: canProceed() ? `0 0 12px rgba(255,20,147,0.7)` : "none" }}>
              SUBMIT &amp; SEND DEPOSIT ON IG ♡
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FormLabel({ children }) {
  return <label className="block text-xs font-bold tracking-widest" style={{ color: PINK }}>♡ {children}</label>;
}

function FormInput({ value, onChange, placeholder, type = "text", multiline = false }) {
  const style = { background: BLACK_CARD, border: `1px solid ${PINK}`, color: PINK_SOFT, fontFamily: "inherit", fontStyle: "italic" };
  const className = "w-full px-3 py-2.5 text-sm focus:outline-none";
  if (multiline) {
    return <textarea rows={3} className={className} style={style} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
  }
  return <input type={type} className={className} style={style} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
}

// ============================================================
// POLICIES PAGE
// ============================================================
function PoliciesPage({ onNav }) {
  return (
    <div style={{ background: CREAM, color: BURGUNDY, minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-2">
          <h1 style={{ fontFamily: SERIF, fontSize: 42, lineHeight: 1.1, letterSpacing: 0.5, color: BURGUNDY }}>
            <span style={{ color: ROSE, marginRight: 10 }}>♡</span>
            Policies &amp; Aftercare
            <span style={{ color: ROSE, marginLeft: 10 }}>♡</span>
          </h1>
          <p className="text-xs italic opacity-70 mt-2 mb-4">read before booking</p>
        </div>
        <LeopardStrip />
        <PolicySection title="Fixes" items={POLICIES.fixes} />
        <LeopardStrip />
        <PolicySection title="Reminder" items={[POLICIES.reminder]} />
        <LeopardStrip />
        <PolicySection title="Aftercare" items={POLICIES.aftercare} />
        <LeopardStrip />
        <PolicySection title="Payments" items={POLICIES.payments} />
        <LeopardStrip />
        <PolicySection title="Before Your Appt" items={POLICIES.beforeAppt} />
        <LeopardStrip />
        <PolicySection title="Fills" items={POLICIES.fills} />
        <LeopardStrip />
        <PolicySection title="Booking" items={POLICIES.booking} />
        <div className="text-center mt-10">
          <button onClick={() => onNav("book")} className="px-8 py-3 text-xs font-bold tracking-widest" style={{ background: ROSE, color: "#fff", boxShadow: `0 4px 12px rgba(212,134,155,0.4)` }}>
            READY TO BOOK ♡
          </button>
        </div>
      </div>
      <footer className="text-center py-6 text-xs opacity-60" style={{ borderTop: `1px solid rgba(212,134,155,0.3)` }}>
        ♡ LuxLashes by Mariee · Montebello, CA ♡
      </footer>
    </div>
  );
}

function LeopardStrip() {
  return <div style={{ height: 18, backgroundImage: LEOPARD_STRIP, backgroundRepeat: "repeat-x", backgroundSize: "120px 16px", backgroundPosition: "center", margin: "20px 0", opacity: 0.8 }} />;
}

function PolicySection({ title, items }) {
  return (
    <section className="my-6">
      <h2 className="text-center mb-4 flex items-center justify-center gap-2" style={{ fontFamily: SERIF, fontSize: 18, letterSpacing: 1.2, color: BURGUNDY, fontWeight: 600, textTransform: "uppercase" }}>
        <span style={{ color: ROSE }}>♡</span>
        {title}
        <span style={{ color: ROSE }}>♡</span>
      </h2>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3 text-sm leading-relaxed">
            <span style={{ color: ROSE, fontSize: 12, marginTop: 4, flexShrink: 0 }}>♡</span>
            <span>{it}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// HIDDEN FORM FOR NETLIFY DETECTION
// ============================================================
// STICKY MOBILE BOOK BUTTON
// ============================================================
function StickyBook({ page, onNav }) {
  if (page === "book") return null;
  return (
    <button onClick={() => onNav("book")} className="fixed bottom-4 right-4 sm:hidden z-50 flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-widest" style={{ background: PINK, color: BLACK, boxShadow: `0 4px 14px rgba(255,20,147,0.6)` }}>
      <Heart size={12} fill={BLACK} stroke={BLACK} />
      BOOK NOW
    </button>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [bannerOpen, setBannerOpen] = useState(true);

  function nav(p) {
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }

  return (
    <>
      <Head>
        <title>LuxLashes by Mariee · Montebello, CA</title>
        <meta name="description" content="Custom lash extensions in Montebello, CA. Classic, Hybrid, Volume, and Mega Volume sets by Mariee. Book your appointment today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {bannerOpen && page !== "policies" && <Banner onClose={() => setBannerOpen(false)} />}
        <Nav page={page} onNav={nav} theme={page === "policies" ? "refined" : "bold"} />
        {page === "home" && <HomePage onNav={nav} />}
        {page === "book" && <BookPage onNav={nav} />}
        {page === "policies" && <PoliciesPage onNav={nav} />}
        <StickyBook page={page} onNav={nav} />
      </div>
    </>
  );
}