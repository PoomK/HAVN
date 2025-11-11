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

import heroPet from "@/assets/dog-hero-sec.png";
import whoofAppDesign from "@/assets/whoof-app-design.png";
import whoofIcon from "@/assets/dog-icon.svg";
import havnCollar from "@/assets/havn-collar.png";
import dogRunning from "@/assets/dog-running-garden.png";
import heroBg from "@/assets/hero-sec-bg.png";

import cardDogVet from "@/assets/dog-vet.png";
import cardDogStress from "@/assets/card-dog-stress.png";
import cardDogWalk from "@/assets/card-dog-walk.png";
import cardDogPeace from "@/assets/card-dog-peace.png";
import cardDogHealth from "@/assets/card-dog-health.png";

import solHavnProd from "@/assets/HAVN-Product-guide.png";
import havnAppScreen from "@/assets/Havn-app.png";

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
    const totalPages = 3;
  
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
              pr-[20vw] -mr-[20vw]
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
                src={dogRunning}
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
              What pet owners really want
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

      {/* PRODUCT */}
      <section className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
        <div id="product" className="container mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Designed for comfort. <span className="text-white/60">Built for care.</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            HAVN combines sleek design with medical-grade technology to keep your dog safe, healthy, and connected.
          </p>

          {/* Collar Image */}
          <div className="flex justify-center">
            <img
              src={solHavnProd}
              alt="HAVN collar feature diagram"
              className="w-full max-w-5xl rounded-2xl shadow-2xl"
            />
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/50 mt-0">
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
                className="w-[75%] max-w-xs md:max-w-sm rounded-[28px] shadow-xl border border-black/5"
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

      {/* Business Model */}
      <section className="py-20 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-10">
            <h2 id="pricing" className="text-4xl md:text-5xl font-bold">
              Our Business Model
            </h2>
            <p className="text-xl text-muted-foreground">
              Sustainable growth through hardware sales and subscription services.
            </p>

            {/* Currency Toggle UNDER the subtitle */}
            <div className="flex justify-center">
              <div className="inline-flex items-center rounded-full border bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setCurrency("GBP")}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    currency === "GBP" ? "bg-background shadow font-medium" : "text-muted-foreground"
                  }`}
                  aria-pressed={currency === "GBP"}
                >
                  GBP £
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("THB")}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    currency === "THB" ? "bg-background shadow font-medium" : "text-muted-foreground"
                  }`}
                  aria-pressed={currency === "THB"}
                >
                  THB ฿
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Hardware Card */}
            <Card className="p-8 space-y-6 border-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Hardware</h3>
                <div className="text-4xl font-bold text-primary">
                  {formatPrice(PRICES[currency].device, currency)}
                </div>
                <p className="text-muted-foreground">One-time device purchase</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Lightweight collar tag with integrated sensors</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Water-resistant, everyday wear</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 30-day battery life</span>
                </li>
              </ul>
            </Card>

            {/* Subscription Card */}
            <Card className="p-8 space-y-6 border-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Subscription Plan</h3>
                <div className="text-4xl font-bold text-primary">
                  {formatPrice(PRICES[currency].sub, currency)}
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Full features & continuous insights</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Personalised AI health insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Full history, trends & alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Vet-ready health reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
            </Card>

            {/* Enterprise Card (Future) */}
            <Card className="p-8 space-y-6 border-2 relative">
              <div className="absolute top-0 right-0 bg-muted text-muted-foreground px-3 py-1 text-xs font-semibold">
                FUTURE
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <div className="text-4xl font-bold text-primary">Custom</div>
                <p className="text-muted-foreground">For clinics, shelters & insurers</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Bulk device pricing & fleet management</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API access & data export</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">White-label options</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">
                *Roadmap: expand to B2B after consumer launch and validation.*
              </p>
            </Card>
          </div>

          {/* Strategy / Revenue narrative */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Revenue & Strategy</h3>
                    <p className="text-muted-foreground">
                      We start B2C with a simple purchase-and-subscribe model: affordable hardware and a
                      monthly plan for continuous, personalised insights. This creates predictable,
                      recurring revenue and keeps ownership costs transparent for pet parents.
                    </p>
                  </div>
                </div>

                {/* Now vs Next */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-background p-4">
                    <h4 className="font-semibold mb-1">Now: B2C Focus</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate product-market fit with pet owners, grow subscription base, and refine AI
                      with real-world datasets.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-background p-4">
                    <h4 className="font-semibold mb-1">Next: B2B Expansion</h4>
                    <p className="text-sm text-muted-foreground">
                      Partner with clinics, shelters, and insurers for bulk deployments, data-driven care
                      pathways, and co-branded wellness programs.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div id="preorder" className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:5xl font-bold">
              Give Your Pet the Care They Deserve
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of pet owners who trust us with their pet's health
              and wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <Button
                size="lg"
                variant="secondary"
                className="group w-full sm:w-auto"
                onClick={() => setPreorderOpen(true)}
              >
                Pre-Order Now
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
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md p-6 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Join the Pre-Order List</DialogTitle>
            <DialogDescription className="text-sm">
              Pop in your email and we’ll notify you as soon as pre-orders open.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePreorderSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="preorder-email">Email address</Label>
              <Input
                id="preorder-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@petlover.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {submitted === "ok" && (
              <p className="text-sm text-green-600">Got it! You’re on the list 🐾</p>
            )}
            {submitted === "error" && (
              <p className="text-sm text-red-600">
                Please enter a valid email and try again.
              </p>
            )}

            <div className="text-xs text-muted-foreground">
              We’ll only use this to notify you about pre-orders.
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setPreorderOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Submitting..." : "Notify me"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <img src={whoofIcon} alt="Whoof logo" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">HAVN</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 HAVN. Built for New Venture coursework. By Penterprise.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
