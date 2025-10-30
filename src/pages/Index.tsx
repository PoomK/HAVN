import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Activity, Brain, Shield, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroPet from "@/assets/hero-pet.jpg";
import healthData from "@/assets/health-data.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Activity className="h-4 w-4" />
                  AI-Powered Pet Health
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Like Whoop,
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  But for Pets
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Monitor your pet's health, behavior, and activity in real-time with AI-powered insights. Peace of mind, one wag at a time.
              </p>
              
              <div className="flex items-center gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Pets</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <img
                src={heroPet}
                alt="Happy dog wearing smart health collar"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              The Problem Pet Owners Face
            </h2>
            <p className="text-xl text-muted-foreground">
              Every year, pet owners face uncertainty about their pets' health. By the time symptoms appear, 
              it's often too late for early intervention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Late Detection</h3>
              <p className="text-muted-foreground">
                Health issues often go unnoticed until they become serious, leading to costly treatments and reduced quality of life.
              </p>
            </Card>
            
            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Limited Insights</h3>
              <p className="text-muted-foreground">
                Without continuous monitoring, pet owners miss critical patterns in behavior, activity, and vital signs.
              </p>
            </Card>
            
            <Card className="p-8 space-y-4 border-2 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Peace of Mind</h3>
              <p className="text-muted-foreground">
                Constant worry about pet health affects quality of life for both owners and their beloved companions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={healthData}
                alt="Pet health data visualization"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                  <Brain className="h-4 w-4" />
                  Our Solution
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Intelligent Health Monitoring, Simplified
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Our lightweight, AI-powered collar continuously monitors your pet's vital signs, activity levels, 
                and behavior patterns to detect health issues before they become serious.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-Time Vitals</h4>
                    <p className="text-muted-foreground">Heart rate, temperature, and respiratory monitoring 24/7</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Activity Tracking</h4>
                    <p className="text-muted-foreground">Monitor exercise, sleep quality, and daily movement patterns</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI Insights</h4>
                    <p className="text-muted-foreground">Predictive analytics identify potential health issues early</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="value" className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Pet Owners Choose Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced technology meets compassionate care for your furry family members.
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
      <section id="pricing" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Our Business Model
            </h2>
            <p className="text-xl text-muted-foreground">
              Sustainable growth through hardware sales and subscription services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 space-y-6 border-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Hardware Sales</h3>
                <div className="text-4xl font-bold text-primary">$149</div>
                <p className="text-muted-foreground">One-time device cost</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Premium collar with sensors</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Water-resistant design</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">30-day battery life</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 space-y-6 border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold">
                POPULAR
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Premium Plan</h3>
                <div className="text-4xl font-bold text-primary">$12.99<span className="text-lg text-muted-foreground">/mo</span></div>
                <p className="text-muted-foreground">Full feature access</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI health insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited data history</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Vet telehealth access</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 space-y-6 border-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <div className="text-4xl font-bold text-primary">Custom</div>
                <p className="text-muted-foreground">For vet clinics & shelters</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Bulk device pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">White-label options</span>
                </li>
              </ul>
            </Card>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start gap-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Revenue Streams</h3>
                  <p className="text-muted-foreground">
                    Our hybrid model combines upfront hardware revenue with recurring subscription income, 
                    ensuring sustainable growth while maintaining affordability for pet owners. Partnership 
                    opportunities with veterinary clinics and pet insurance companies create additional revenue channels.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Give Your Pet the Care They Deserve
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of pet owners who trust us with their pet's health and wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="xl" variant="secondary" className="group">
                Pre-Order Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Whoof</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Whoof. Built for venture coursework.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
