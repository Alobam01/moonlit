import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Stethoscope,
  Syringe,
  Heart,
  FileText,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";

const healthServices = [
  {
    icon: Stethoscope,
    title: "Comprehensive Vet Exams",
    description:
      "Every kitten receives multiple veterinary examinations from birth to adoption, ensuring they're in perfect health.",
  },
  {
    icon: Syringe,
    title: "Age-Appropriate Vaccinations",
    description:
      "Complete vaccination series including FVRCP (distemper combo) and rabies, administered on schedule by our vet.",
  },
  {
    icon: Heart,
    title: "Genetic Health Testing",
    description:
      "All breeding cats are tested for breed-specific genetic conditions like HCM, PKD, and PRA to ensure healthy offspring.",
  },
  {
    icon: FileText,
    title: "Complete Health Records",
    description:
      "You receive detailed health records including vaccination history, deworming schedule, and vet exam results.",
  },
];

const guaranteePoints = [
  "1-year guarantee against genetic/hereditary conditions",
  "Immediate coverage from day of adoption",
  "Full refund or replacement kitten option",
  "Covers conditions like HCM, PKD, hip dysplasia",
  "Vet examination required within 72 hours of adoption",
  "Transferable if kitten is rehomed",
];

const parentTestings = [
  { test: "Hypertrophic Cardiomyopathy (HCM)", frequency: "Annual" },
  { test: "Polycystic Kidney Disease (PKD)", frequency: "One-time DNA" },
  { test: "Progressive Retinal Atrophy (PRA)", frequency: "One-time DNA" },
  { test: "FeLV/FIV Testing", frequency: "Annual" },
  { test: "Blood Type Testing", frequency: "One-time" },
];

export default function Health() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sage/30 text-sage-dark text-sm font-medium mb-4">
              Health & Guarantee
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Peace of Mind
              <span className="text-gradient block">Is Our Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We stand behind the health of every kitten with comprehensive care, 
              genetic testing, and a solid health guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Health Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Health Care
            </h2>
            <p className="text-lg text-muted-foreground">
              Every kitten receives thorough health care from birth to adoption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {healthServices.map((service, index) => (
              <Card
                key={service.title}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center shrink-0">
                    <service.icon className="w-7 h-7 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Guarantee */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/30 mb-6">
                <Shield className="w-5 h-5 text-sage-dark" />
                <span className="text-sm font-medium text-sage-dark">
                  1-Year Health Guarantee
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Protected from Day One
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're confident in the health of our kittens because we invest in 
                proper genetic testing and veterinary care. Our guarantee reflects 
                that commitment.
              </p>

              <div className="space-y-4">
                {guaranteePoints.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-coral" />
                    </div>
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Card variant="elevated" className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="https://images.unsplash.com/photo-1615789591457-74a63395c990?w=800&h=450&fit=crop"
                    alt="Healthy kitten at vet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 text-coral mb-4">
                    <Shield className="w-6 h-6" />
                    <span className="font-semibold">Guarantee Highlights</span>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full refund or replacement kitten</li>
                    <li>• Covers all genetic conditions</li>
                    <li>• Valid for 12 months</li>
                    <li>• Easy claim process</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Breeding Cat Health Testing
              </h2>
              <p className="text-lg text-muted-foreground">
                Our breeding cats undergo rigorous health testing to ensure they 
                produce healthy kittens.
              </p>
            </div>

            <Card variant="elevated" className="animate-fade-up">
              <CardContent className="p-8">
                <div className="grid gap-4">
                  {parentTestings.map((test, index) => (
                    <div
                      key={test.test}
                      className="flex items-center justify-between py-4 border-b border-border last:border-0"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sage/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-sage-dark" />
                        </div>
                        <span className="font-medium text-foreground">{test.test}</span>
                      </div>
                      <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {test.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notice */}
            <div className="mt-8 p-6 rounded-2xl bg-blush/30 border border-coral/20 flex gap-4 animate-fade-up">
              <AlertCircle className="w-6 h-6 text-coral shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Important Health Note
                </h4>
                <p className="text-muted-foreground text-sm">
                  While we do everything possible to ensure healthy kittens, no breeder 
                  can guarantee a cat will never become ill. We recommend pet insurance 
                  for ongoing peace of mind beyond our guarantee period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Questions About Our Health Practices?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            We're happy to discuss our health protocols and answer any questions 
            you have about your future kitten's care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="hero" size="xl" className="gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/kittens">
              <Button variant="outline" size="xl">
                View Available Kittens
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
