import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Heart,
  Activity,
  Brain,
  Shield,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import heroPet from "@/assets/dog-hero-sec.png";
import whoofAppDesign from "@/assets/whoof-app-design.png";
import whoofIcon from "@/assets/dog-icon.svg";
import havnCollar from "@/assets/havn-collar.png";
import dogRunning from "@/assets/dog-running-garden.png";
import dogRunning2 from "@/assets/dog-running-garden2.png";
import dogRunning3 from "@/assets/dog-running-garden3.png";
import heroBg from "@/assets/hero-sec-bg.png";

import cardDogVet from "@/assets/dog-vet.png";
import cardDogStress from "@/assets/card-dog-stress.png";
import cardDogWalk from "@/assets/card-dog-walk.png";
import cardDogPeace from "@/assets/card-dog-peace.png";
import cardDogHealth from "@/assets/card-dog-health.png";

import solHavnProdBlack from "@/assets/HAVN-Product-guide-black.png";
import solHavnProdGold from "@/assets/HAVN-Product-guide-gold.png";
import solHavnProdWhite from "@/assets/HAVN-Product-guide-white.png";
import havnAppScreen from "@/assets/Havn-app.png";

import havnCollarImg from "@/assets/HAVN-Product-des.png";
import havnAppImg from "@/assets/Havn-app.png";

import havnLogo from "@/assets/havn-logo-png.png";

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzsgIGZ0RKKgG3lj_xWvo35S_qfuaJSI6gg6rIPw2C_LHFysal3lEWjKU3n7WTXQN4l/exec";

const Index = () => {
  const [preorderOpen, setPreorderOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "ok" | "error">(null);
  const [currency, setCurrency] = useState<"GBP" | "THB">("GBP");

  const PRICES = { GBP: { device: 69.99, sub: 4.99 }, THB: { device: 2990, sub: 199 } } as const;
  function formatPrice(amount: number, curr: "GBP" | "THB") {
    return new Intl.NumberFormat(curr === "GBP" ? "en-GB" : "th-TH", {
      style: "currency",
      currency: curr,
      maximumFractionDigits: curr === "THB" ? 0 : 2,
    }).format(amount);
  }

  useEffect(() => {
    const overlay = document.getElementById("fadeOverlay");
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 500;
      const opacity = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1) * 0.9;
  
      if (overlay) overlay.style.opacity = opacity.toString();
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  

  async function handlePreorderSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(null);

    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setSubmitted("error");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}`,
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : null;

      if (json?.ok) {
        setSubmitted("ok");
        setEmail("");
      } else {
        setSubmitted("error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setSubmitted("error");
    } finally {
      setSubmitting(false);
    }
  }

  const ValueCarousel = () => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(0);   // 0, 1, 2
    const totalPages = 4;
  
    const cards = [
      {
        tag: "Health Insight",
        title: "Understand your pet’s health in real-time. Turns invisible signals into clear, daily insights.",
        body:
          "Track vital signs like heart rate, temperature, and sleep — turning invisible signals into clear, daily insights.",
        image: cardDogHealth,
      },
      {
        tag: "Early Detection",
        title: "Catch problems early — before they become costly or serious.",
        body:
          "Subtle shifts in stress, sleep, or activity patterns trigger early warnings, helping you act before symptoms worsen.",
        image: cardDogVet,
      },
      {
        tag: "Stress & Emotion",
        title: "Understand your pet’s mood, not just their behavior.",
        body:
          "AI-powered behavioral tracking helps you recognize stress and emotional changes, improving comfort and wellbeing.",
        image: cardDogStress,
      },
      {
        tag: "Lifestyle Balance",
        title: "Find the perfect balance of rest and activity",
        body:
          "Know when your pet needs more play, recovery, or relaxation — helping them stay active, happy, and healthy.",
        image: cardDogWalk,
      },
      {
        tag: "Peace of Mind",
        title: "Relax — you’ll know if something’s wrong, even when you’re not there.",
        body:
          "Real-time alerts and continuous monitoring keep you reassured — even when you’re away from home.",
        image: cardDogPeace,
      },
    ];    
  
    // Move by exactly one card
    const moveByOneCard = (direction: "left" | "right") => {
      if (!trackRef.current) return;
  
      const container = trackRef.current;
      const firstCard = container.querySelector<HTMLElement>("[data-card]");
      const cardWidth = firstCard?.offsetWidth ?? 320;
      const gap = 24; // md:gap-6 ≈ 1.5rem = 24px
  
      const delta = (direction === "right" ? 1 : -1) * (cardWidth + gap);
      const maxPage = totalPages - 1;
  
      setPage((current) => {
        const next =
          direction === "right"
            ? Math.min(current + 1, maxPage)
            : Math.max(current - 1, 0);
  
        // Only scroll if page is actually changing
        if (next !== current) {
          container.scrollBy({
            left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
            behavior: "smooth",
          });
        }
  
        return next;
      });
    };
  
    return (
      <div className="mt-16">
        {/* Wrapper stays within normal container margin */}
        <div className="relative">
          {/* Left arrow – only appears after first move */}
          <button
            type="button"
            onClick={() => moveByOneCard("left")}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-background/95 border border-border shadow hover:bg-muted transition-colors ${
              page === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
  
          {/* Right arrow – disappears when you’ve gone right twice */}
          <button
            type="button"
            onClick={() => moveByOneCard("right")}
            className={`hidden md:flex absolute right-[2vw] top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-background/95 border border-border shadow hover:bg-muted transition-colors ${
              page === totalPages - 1
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
  
          {/* Track – left aligned to container, bleeds out to the RIGHT */}
          <div
            ref={trackRef}
            className="
              flex gap-4 md:gap-6 pb-6 pt-2
              overflow-x-auto scrollbar-none
              pr-[27vw] -mr-[27vw]
            "
          >
            {cards.map((card) => (
              <div
                key={card.title}
                data-card
                className="
                  min-w-[280px] md:min-w-[320px]
                  max-w-[340px] md:max-w-[360px]
                  flex-shrink-0
                "
              >
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-transparent" />

                  {/* Text overlay */}
                  <div className="absolute inset-x-0 top-0 p-6">
                    <h4 className="text-2xl md:text-3xl font-semibold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                      {card.tag}
                    </h4>
                    <p className="mt-3 text-sm md:text-base text-white/90 max-w-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`
                h-2.5 w-2.5 rounded-full transition-all duration-200
                ${i === page ? "bg-foreground scale-110" : "bg-muted-foreground/50"}
              `}
            />
          ))}
        </div>
      </div>
    );
  };

  const [bandColor, setBandColor] = useState<"black" | "gold" | "white">("black");

  const collarImages: Record<typeof bandColor, string> = {
    black: solHavnProdBlack,
    gold: solHavnProdGold,
    white: solHavnProdWhite,
  };

  const colorOptions: { id: typeof bandColor; label: string; className: string }[] = [
    { id: "black", label: "Onyx Black", className: "bg-neutral-900" },
    { id: "gold", label: "Champagne Gold", className: "bg-[#E3C98C]" },
    { id: "white", label: "Polar White", className: "bg-slate-200" },
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-start overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          id="fadeOverlay"
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/100 opacity-0 transition-opacity duration-300 pointer-events-none"
        />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl space-y-6">
            <h1
              className="font-sans text-[clamp(2.8rem,5vw,4.5rem)] font-semibold text-white leading-[1.05] tracking-tight"
            >
              Peace of mind,<br />
              <span className="text-white/90">redefined for pets.</span>
            </h1>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white/80 max-w-xl font-normal tracking-tight leading-snug">
              A sleek, AI-powered collar that monitors your pet’s health, activity, and stress levels — giving you calm, continuous insight every day.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
        <div id="product" className="container mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Designed for comfort.{" "}
            <span className="text-white/60">Built for care.</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-6 md:mb-4">
            HAVN combines sleek design with medical-grade technology to keep your dog
            safe, healthy, and connected.
          </p>

          {/* Collar Image */}
          <div className="flex justify-center">
            <img
              src={collarImages[bandColor]}
              alt="HAVN collar feature diagram"
              className="w-full max-w-5xl rounded-2xl shadow-2xl transition-transform duration-300 ease-out"
            />
          </div>

          {/* Colour selector */}
          <div className="mb-6 md:mb-8 flex flex-col items-center gap-3">
            <p className="text-xs md:text-sm uppercase tracking-[0.16em] text-white/50">
              Select band colour
            </p>
            <div className="flex items-center gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBandColor(option.id)}
                  className={`
                    h-9 w-9 md:h-10 md:w-10 rounded-full border
                    flex items-center justify-center
                    transition-transform duration-200
                    ${bandColor === option.id
                      ? "border-white scale-110 shadow-[0_0_0_2px_rgba(255,255,255,0.3)]"
                      : "border-white/30 hover:scale-105"}
                  `}
                  aria-label={option.label}
                  aria-pressed={bandColor === option.id}
                >
                  <span
                    className={`h-7 w-7 md:h-8 md:w-8 rounded-full ${option.className}`}
                  />
                </button>
              ))}
            </div>
            {/* Active colour label */}
            <p className="text-xs md:text-sm text-white/60">
              {colorOptions.find((c) => c.id === bandColor)?.label}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xs md:text-sm text-white/50 mt-4 md:mt-6">
            *Engineered for every adventure — light, durable, and ready for life with your dog.*
          </p>
        </div>
      </section>

      {/* Solution – App Section */}
      <section className="py-20 md:py-24 bg-background">
        <div id="solution" className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={havnAppScreen} // <-- use your app image import here
                alt="HAVN app showing pet health insights"
                className="w-[80%] max-w-xs md:max-w-sm rounded-[28px]"
              />
            </div>

            {/* Right: Copy */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                The HAVN App
              </span>

              <h2
                className="
                  font-sans font-semibold tracking-tight
                  text-[clamp(2.4rem,4vw,3.2rem)]
                  leading-[1.05]
                  text-foreground
                "
              >
                Your pet’s health,<br /> at a glance.
              </h2>

              <p className="text-base md:text-lg text-muted-foreground max-w-md">
                The HAVN collar streams data into a simple app, turning raw signals into clear,
                everyday guidance — so you always know how your pet is doing and what they need next.
              </p>

              <div className="space-y-4 pt-2">
                {/* Continuous Vitals Monitoring */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base md:text-lg">
                      Continuous Vitals Monitoring
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Tracks heart rate, temperature, and respiration in real time to
                      flag stress, fatigue, or illness before symptoms appear.
                    </p>
                  </div>
                </div>

                {/* Activity & Recovery Tracking */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base md:text-lg">
                      Activity &amp; Recovery Tracking
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Understand your pet’s play, rest, and movement patterns to keep
                      their routine balanced and healthy.
                    </p>
                  </div>
                </div>

                {/* AI-Powered Insights */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base md:text-lg">
                      AI-Powered Insights
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Adaptive models learn your pet’s normal patterns to spot
                      anomalies, sending clear, personalised alerts and recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem + Value Section */}
      <section className="py-20 md:py-24 bg-background">
        <div id="problem" className="container mx-auto px-4">
          {/* Top: Problem intro */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h2
              className="
                font-sans font-semibold tracking-tight
                text-[clamp(2.8rem,4vw,3.6rem)]
                leading-[1.05]
                text-foreground
              "
            >
              Understand your pet’s health,<br />
              improve their wellbeing.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Daily monitoring helps detect early signs of stress, fatigue, or illness — 
              giving owners data-backed confidence and helping pets live healthier, happier lives.
            </p>
            <div className="mt-6 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={dogRunning3}
                alt="Dog wearing HAVN collar showing pet health tracking"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Anchor so #value still scrolls here */}
          <div id="value" className="h-0" />

          {/* Mid: Section label */}
          <div className="max-w-4xl mx-auto space-y-6 pt-16">
            <h2
              className="
                font-sans font-semibold tracking-tight
                text-[clamp(2.8rem,4vw,3.6rem)]
                leading-[1.05]
                text-foreground
              "
            >
              What value does HAVN provide?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Transform everyday care into proactive health insights — giving your pet a voice through data.
            </p>
            <ValueCarousel />
          </div>

          {/* Cards: horizontally scrollable row with buttons */}
          {/* <ProblemValueCarousel /> */}
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <h2
              id="pricing"
              className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
            >
              Pricing
            </h2>
            <p className="text-sm md:text-base text-white/70">
              Simple hardware + subscription model that keeps ownership costs clear,
              while unlocking continuous, AI-powered pet health insights.
            </p>

            {/* Currency Toggle */}
            <div className="flex justify-center pt-2">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setCurrency("GBP")}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                    currency === "GBP"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/70"
                  }`}
                  aria-pressed={currency === "GBP"}
                >
                  GBP £
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("THB")}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                    currency === "THB"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/70"
                  }`}
                  aria-pressed={currency === "THB"}
                >
                  THB ฿
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {/* Device card */}
            <div className="flex flex-col overflow-hidden rounded-[32px] bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              {/* Top copy */}
              <div className="px-8 pt-8 pb-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-500">
                  Device
                </p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-neutral-900">
                  HAVN Collar &amp; Sensor
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                    {formatPrice(PRICES[currency].device, currency)}
                  </span>
                  <span className="text-xs md:text-sm text-neutral-500">one-time</span>
                </div>
              </div>

              {/* Shared image area – same dimensions as subscription card */}
              <div className="px-8">
                <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-100 flex items-end justify-center">
                  <img
                    src={havnCollarImg}
                    alt="HAVN collar device"
                    className="h-[120%] max-w-full object-contain translate-y-4"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="px-8 pb-8 pt-6">
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>
                      Lightweight collar tag with integrated medical-grade sensors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>Water-resistant and built for everyday wear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>Small and compact, fits dogs of all sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>Up to 2-weeks battery life on a single charge</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setPreorderOpen(true)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Start with the device
                </button>
              </div>
            </div>

            {/* Subscription card */}
            <div className="flex flex-col overflow-hidden rounded-[32px] bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              {/* Top copy */}
              <div className="px-8 pt-8 pb-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-500">
                  Membership
                </p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-neutral-900">
                  HAVN App Subscription
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                    {formatPrice(PRICES[currency].sub, currency)}
                  </span>
                  <span className="text-xs md:text-sm text-neutral-500">/ month (3 months free trial)</span>
                </div>
              </div>

              {/* Shared image area – same as device; phone shows only top half */}
              <div className="px-8">
                <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-100 flex items-end justify-center">
                  <img
                    src={havnAppImg}
                    alt="HAVN app on phone"
                    className="h-[150%] max-w-[260px] object-contain translate-y-40"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="px-8 pb-8 pt-6">
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>
                      Personalised AI health insights and daily guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>
                      Full history, trends, and proactive alerts for early detection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>Vet-ready reports you can share in seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>Priority support as we evolve the platform</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setPreorderOpen(true)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Start your membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="preorder" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2
              className="
                font-sans font-semibold tracking-tight
                text-[clamp(2.2rem,3.3vw,2.8rem)]
                leading-[1.05]
                text-foreground
              "
            >
              Give your pet the care they deserve
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Join early adopters who want clearer answers about their pet’s health,
              not just guesswork.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <Button
                size="lg"
                variant="default"
                className="rounded-full bg-black text-white hover:bg-black/80 text-[11px] font-semibold tracking-[0.16em] px-6 py-2 uppercase"
                onClick={() => setPreorderOpen(true)}
              >
                Pre-order now
                <ArrowRight className="h-5 w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preorder Popup */}
      <Dialog
        open={preorderOpen}
        onOpenChange={(open) => {
          setPreorderOpen(open);
          if (!open) {
            setEmail("");
            setSubmitted(null);
            setSubmitting(false);
          }
        }}
      >
        <DialogContent
          className="
            w-[calc(100vw-2rem)]
            sm:max-w-sm
            rounded-3xl
            border
            border-border
            bg-background/95
            p-6 sm:p-7
            shadow-xl
          "
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
              Join the pre-order list
            </DialogTitle>
            <DialogDescription className="text-sm md:text-[15px] text-muted-foreground">
              Pop in your email and we’ll notify you as soon as pre-orders open.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePreorderSubmit} className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label
                htmlFor="preorder-email"
                className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
              >
                Email address
              </Label>
              <Input
                id="preorder-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 rounded-full border border-border bg-background text-sm"
              />
            </div>

            {submitted === "ok" && (
              <p className="text-sm text-emerald-600">
                Got it! You’re on the list 🐾
              </p>
            )}
            {submitted === "error" && (
              <p className="text-sm text-red-600">
                Please enter a valid email and try again.
              </p>
            )}

            <div className="text-[11px] md:text-xs text-muted-foreground">
              We’ll only use this to notify you about pre-orders.
            </div>

            <DialogFooter className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-border text-sm"
                onClick={() => setPreorderOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="
                  w-full sm:w-auto
                  rounded-full
                  bg-black text-white
                  hover:bg-black/90
                  text-sm font-medium
                "
              >
                {submitting ? "Submitting..." : "Notify me"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <h2
              className="
                font-sans font-semibold tracking-tight
                text-[clamp(2.4rem,3.6vw,3rem)]
                leading-[1.05]
                text-white
              "
            >
              Frequently asked questions
            </h2>
            <p className="text-base md:text-lg text-white text-muted-foreground">
              Everything you might be wondering about HAVN — from how it works, to
              what happens when something looks off.
            </p>
          </div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto text-white">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="faq-accuracy" className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4">
                  How accurate is the HAVN collar in measuring health metrics?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm md:text-base text-white">
                  HAVN uses medical-grade sensors similar to those in leading human wearables.
                  Metrics like heart rate, HRV, temperature, and activity are sampled
                  continuously, then filtered and calibrated so you get stable trends rather
                  than noisy spikes. Our insights are built on veterinary research linking these
                  signals to stress, fatigue, and early signs of illness.
                  
                  <br /><br />

                  <a
                    href="https://advanced.onlinelibrary.wiley.com/doi/pdfdirect/10.1002/adfm.201910288?download=true&campaigns=%5B%7B%22position%22%3A%22ereader-last-page%22%2C%22uri%22%3A%22uri%3A707b1a3c-73e6-4188-b21f-2b05b70307d8%22%7D%2C%7B%22position%22%3A%22ereader-first-page%22%2C%22uri%22%3A%22uri%3A7691ea89-90f5-4086-9241-486673caed61%22%7D%5D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    LINK TO RESEARCH →
                  </a>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-anomaly" className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4">
                  What happens when HAVN detects something abnormal?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm md:text-base text-white">
                  If HAVN spots patterns outside your pet’s normal range, the app
                  sends a clear alert explaining what changed and why it might matter.
                  For persistent or serious anomalies, HAVN makes recommendations and contacts your vet, and exports a concise health report you can share ahead of the appointment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-comfort" className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4">
                  Is the device safe and comfortable for everyday wear?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm md:text-base text-white">
                  Yes. The collar is lightweight, breathable, and made from
                  pet-friendly materials designed for 24/7 wear. It’s low-profile
                  enough to sit alongside your existing collar, and the sensor module
                  is rounded so it doesn’t dig into your pet’s neck when they lie
                  down.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-subscription" className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4">
                  Do I need a subscription? What does it unlock?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm md:text-base text-white">
                  The one-time device purchase gives you the physical collar and
                  core tracking. The subscription unlocks what makes HAVN special:
                  advanced AI insights, full history and trends, proactive health
                  alerts, and vet-ready reports you can share in seconds. It’s built
                  to give ongoing value, not just raw numbers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-difference" className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4">
                  What makes HAVN different from GPS trackers or basic activity collars?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm md:text-base text-white">
                  Most trackers focus on location or step counts. HAVN is built
                  around health: medical-grade sensors, AI-driven anomaly detection,
                  and early-warning alerts that help you spot issues before they
                  become emergencies. It’s like giving your pet a voice about how
                  they’re really feeling. Furthermore, HAVN's design prioritizes comfort and fits all dogs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            
            {/* Logo + Instagram */}
            <div className="flex items-center justify-center gap-4">
              {/* HAVN Logo */}
              <div className="flex items-center gap-2">
                <img src={havnLogo} alt="HAVN logo" className="h-6 w-6" />
                <span className="text-lg md:text-xl font-semibold tracking-tight">
                  HAVN
                </span>
              </div>

              {/* Instagram icon */}
              <a
                href="https://www.instagram.com/havn.dg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Visit our Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs md:text-sm text-white/60">
              © 2025 HAVN. Built for New Venture coursework. By Penterprise.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
