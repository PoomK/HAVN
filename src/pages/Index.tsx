import { useState } from "react";
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

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto px-4 py-20 md:py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Activity className="h-4 w-4" />
                  AI-Powered Pet Health and Lifestyle Wearable
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Peace of mind,
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  redefined for pets.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
              A sleek, AI-powered wearable that monitors your pet’s health, activity, and mood - giving you deeper insight and peace of mind every day.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group w-full sm:w-auto bg-black text-white hover:bg-gray-900"
                  onClick={() => setPreorderOpen(true)}
                >
                  Pre-Order Now
                  <ArrowRight className="h-5 w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Happy Pets</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <img
                src={heroPet}
                alt="Happy dog wearing smart health collar"
                className="relative rounded-2xl shadow-2xl w-half-full mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-20 bg-muted/30">
        <div id="problem" className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              The Problem Pet Owners Face
            </h2>
            <p className="text-xl text-muted-foreground">
            Most pets show us they’re unwell only when it’s already too late.
            </p>
            <p className="text-xl text-muted-foreground">
            A lack of continuous insight means small changes in stress, recovery, or rest often go unnoticed - affecting not just their health, but their happiness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Late Detection</h3>
              <p className="text-muted-foreground">
                Most pets hide discomfort until issues become serious. 
              </p>
              <p className="text-muted-foreground">
                Without early detection, problems escalate into painful treatments and costly emergencies 
                that could have been prevented.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-3">
                *Early diagnosis can reduce treatment costs by up to 40%, yet most conditions are detected only after visible symptoms appear (VetHelpDirect, 2023).*
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Limited Insights</h3>
              <p className="text-muted-foreground">
                Day-to-day changes in activity, stress, or rest often go unseen.
              </p>
              <p className="text-muted-foreground">
                Without continuous insights, owners miss subtle patterns that reveal early fatigue, anxiety, or emerging illness.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-3">
                *Nearly 70% of pet owners say they’ve missed early signs of illness in their pets (AVMA, 2024).*
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Peace of Mind</h3>
              <p className="text-muted-foreground">
                The uncertainty of not knowing how your pet truly feels creates constant stress and worry.
              </p>
              <p className="text-muted-foreground">
                It impacts both the owner’s wellbeing and the bond they share with their companion.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-3">
                *Over 80% of owners report anxiety when their pets show unusual behaviour, even if it later proves minor (PetWell Survey, 2024).*
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-32 bg-background">
        <div id="solution" className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={whoofAppDesign}
              alt="Whoof app showing pet health insights"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
              <Brain className="h-4 w-4" />
              Our Solution
            </span>

            <h2 className="text-4xl md:text-5xl font-bold">
              Intelligent Health Monitoring, Simplified
            </h2>

            <p className="text-xl text-muted-foreground">
              HAVN is a lightweight, AI-powered collar that continuously monitors your pet’s wellbeing,
              from heart rate and temperature to stress and sleep patterns. 
              It transforms complex signals into simple, actionable insights, helping you detect health 
              risks early and improve your pet’s daily quality of life.
            </p>

            <div className="space-y-4 pt-0">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Continuous Vitals Monitoring</h4>
                  <p className="text-muted-foreground">
                    Tracks heart rate, temperature, and respiration in real-time, 
                    detecting stress, fatigue, or illness before symptoms appear.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Activity & Recovery Tracking</h4>
                  <p className="text-muted-foreground">
                    Understand your pet’s play, rest, and movement patterns to ensure a balanced, 
                    healthy lifestyle every day.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AI-Powered Insights</h4>
                  <p className="text-muted-foreground">
                    Adaptive algorithms learn your pet’s normal patterns to identify anomalies, 
                    giving you clear, personalized alerts and recommendations.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/70 pt-2">
              *Built with veterinary input and designed for everyday comfort.*
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        id="value"
        className="py-20 md:py-20 bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Pet Owners Choose Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced technology meets compassionate care for your furry family
              members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-all">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Preventive Care</h3>
              <p className="text-muted-foreground text-sm">
                Catch health issues before they become emergencies
              </p>
            </Card>

            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-all">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Cost Savings</h3>
              <p className="text-muted-foreground text-sm">
                Reduce emergency vet visits by up to 40%
              </p>
            </Card>

            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-all">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Peace of Mind</h3>
              <p className="text-muted-foreground text-sm">
                Know your pet is healthy, even when you're away
              </p>
            </Card>

            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-all">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Smart Insights</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered recommendations from vet data
              </p>
            </Card>
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
