import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  ClipboardCheck, 
  CreditCard, 
  Stethoscope, 
  Plane, 
  Heart,
  ArrowRight,
  Check
} from "lucide-react";

const steps = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Initial Inquiry",
    description: "Browse our available kittens and submit an inquiry for the one that captures your heart. We'll respond within 24 hours.",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Application Review",
    description: "Complete our adoption application. We'll review it to ensure a perfect match between you and your future companion.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Deposit & Reserve",
    description: "Once approved, secure your kitten with a $500 non-refundable deposit. Your kitten will be reserved exclusively for you.",
  },
  {
    step: 4,
    icon: Stethoscope,
    title: "Health Preparation",
    description: "Your kitten receives final vaccinations, health checks, and microchipping. We'll send updates and photos!",
  },
  {
    step: 5,
    icon: Plane,
    title: "Pickup or Delivery",
    description: "Pick up your kitten from our home or arrange safe delivery. We offer nationwide shipping with a trusted pet courier.",
  },
  {
    step: 6,
    icon: Heart,
    title: "Welcome Home!",
    description: "Your new family member comes home! We provide ongoing support and are always here to answer questions.",
  },
];

const included = [
  "Age-appropriate vaccinations",
  "Deworming treatments",
  "Microchip registration",
  "Veterinary health certificate",
  "TICA registration papers",
  "Starter kit with food and toys",
  "1-year genetic health guarantee",
  "Lifetime breeder support",
  "Spay/neuter contract (pet quality)",
  "Transition diet guide",
];

export default function Adoption() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
              Adoption Process
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Journey to a
              <span className="text-gradient block">Furry Family Member</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We've made the adoption process simple and transparent. Here's what 
              to expect when you choose to welcome a Purrfect Haven kitten.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="flex gap-6 mb-12 last:mb-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl gradient-coral flex items-center justify-center text-white shadow-card">
                    <step.icon className="w-7 h-7" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-coral to-coral/20 mt-4" />
                  )}
                </div>

                {/* Content */}
                <Card variant="elevated" className="flex-1">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-medium text-coral">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-sage/30 text-sage-dark text-sm font-medium mb-4">
                What's Included
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Everything Your Kitten Needs
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                When you adopt from Purrfect Haven, your kitten comes with everything 
                they need for a healthy, happy start in their new home.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {included.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-sage/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-sage-dark" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=800&fit=crop"
                    alt="Kitten with supplies"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-elevated">
                  <p className="font-serif text-3xl font-bold text-coral mb-1">$2,100+</p>
                  <p className="text-sm text-muted-foreground">Starting price includes all</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blush text-coral-dark text-sm font-medium mb-4">
              Transparent Pricing
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Investment in Your New Companion
            </h2>
            <p className="text-lg text-muted-foreground">
              Our pricing reflects the quality of care, health testing, and 
              preparation each kitten receives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                breed: "British Shorthair",
                price: "$2,100 - $2,500",
                features: ["All colors available", "Pet quality", "Show quality available"],
              },
              {
                breed: "Ragdoll",
                price: "$2,400 - $2,800",
                features: ["Various patterns", "Exceptional temperament", "Champion bloodlines"],
                featured: true,
              },
              {
                breed: "Persian",
                price: "$2,700 - $3,200",
                features: ["Show quality coats", "Rare colors", "Premium lineage"],
              },
            ].map((tier, index) => (
              <Card
                key={tier.breed}
                variant={tier.featured ? "elevated" : "default"}
                className={`animate-fade-up ${
                  tier.featured ? "border-coral/30 shadow-elevated" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  {tier.featured && (
                    <span className="inline-block px-3 py-1 rounded-full bg-coral text-white text-xs font-medium mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {tier.breed}
                  </h3>
                  <p className="font-serif text-3xl font-bold text-coral mb-6">
                    {tier.price}
                  </p>
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-sage-dark" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Browse our available kittens and take the first step toward 
            welcoming your new family member.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kittens">
              <Button variant="hero" size="xl" className="gap-2">
                View Available Kittens
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
