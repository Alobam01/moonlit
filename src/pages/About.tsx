import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, Users, Award, Stethoscope, Clock, ArrowRight } from "lucide-react";

const milestones = [
  { year: "2004", title: "Our Beginning", description: "Started as a small family hobby breeding our first Ragdoll pair." },
  { year: "2008", title: "TICA Registration", description: "Became officially registered with The International Cat Association." },
  { year: "2012", title: "Expanded Breeds", description: "Added British Shorthairs and Persians to our breeding program." },
  { year: "2018", title: "New Facility", description: "Built our dedicated cat facility with spacious play areas." },
  { year: "2024", title: "500+ Adoptions", description: "Celebrated placing over 500 kittens in loving homes." },
];

const values = [
  {
    icon: Heart,
    title: "Love & Care",
    description: "Every kitten is raised as part of our family, receiving individual attention and affection daily.",
  },
  {
    icon: Stethoscope,
    title: "Health First",
    description: "Comprehensive health testing of all breeding cats and thorough vet care for every kitten.",
  },
  {
    icon: Home,
    title: "Home Environment",
    description: "Cage-free living where kittens are socialized with children, dogs, and everyday household activities.",
  },
  {
    icon: Award,
    title: "Ethical Breeding",
    description: "We prioritize genetic health over profit, never overbreeding and always placing kitten welfare first.",
  },
];

export default function About() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
                About Moonlit Elegance Kittens
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Because Every Purr
                <span className="text-gradient block">Begins with Love</span>
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Moonlit Elegance Kittens, we believe every kitten deserves a loving,
                  lifelong home—and every family deserves a healthy, well-adjusted feline
                  companion. Since 2004, we’ve been passionately dedicated to ethical,
                  responsible breeding, with a strong focus on health, temperament, and
                  breed integrity. Our mission is simple: to thoughtfully match each
                  kitten with the family where they will truly thrive.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are a trusted and established breeder specializing in several
                  exceptional purebred cats, including Munchkin, Ragdoll, Persian,
                  Scottish Fold, and British Shorthair kittens. All of our kittens are
                  raised with intention and care—vet-checked, age-appropriate vaccinated,
                  litter-trained, and thoroughly socialized before joining their new
                  homes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What truly sets Moonlit Elegance Kittens apart is our unwavering
                  commitment to animal welfare and ethical breeding practices. Our cats
                  are never overbred, and their health and happiness always come first.
                  All breeding cats are DNA tested for genetic and contagious diseases
                  and have a clean bill of health. We work closely with licensed
                  veterinarians and follow strict breeding standards to ensure every
                  kitten gets the very best start in life.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our kittens are raised indoors as part of our family, with supervised
                  access to a safe outdoor enclosure that allows them to explore, play,
                  and develop confidence in a stress-free environment. From gentle
                  handling to enrichment through toys and interaction, we focus on
                  nurturing affectionate, well-balanced companions who transition
                  smoothly into their forever homes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you’re searching for a playful kitten to fill your home with
                  joy or a calm, affectionate companion for quiet moments, we’re here to
                  guide you every step of the way. We proudly offer nationwide delivery
                  and ongoing support before, during, and after adoption—because our
                  responsibility doesn’t end when your kitten goes home.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join the hundreds of happy families who have found their perfect match
                  with Moonlit Elegance Kittens. We’re more than breeders—we’re
                  caretakers, advocates, and matchmakers for lifelong bonds.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Because every purr begins with love.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  If you’d like to learn more about our breeds or are interested in
                  reserving a kitten, we’d love to hear from you. Please don’t hesitate
                  to contact us with any questions—we’re always happy to help.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/kittens">
                  <Button variant="hero" size="lg" className="gap-2">
                    Meet Our Kittens
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                    <img
                      src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=500&fit=crop"
                      alt="Kitten"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
                    <img
                      src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop"
                      alt="Cat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
                    <img
                      src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop"
                      alt="Cat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                    <img
                      src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=500&fit=crop"
                      alt="Kitten"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sage/30 text-sage-dark text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Guides Everything We Do
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                variant="feature"
                className="animate-fade-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-coral" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Family */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-up">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&h=600&fit=crop"
                  alt="Family with cats"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blush text-coral-dark text-sm font-medium mb-4">
                Our Approach
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ethical Breeding. Healthy Kittens.
                <span className="text-gradient block">Lifelong Support.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our cats are never overbred, and their health and happiness always come
                first. All breeding cats are DNA tested for genetic and contagious
                diseases, and we work closely with licensed veterinarians while following
                strict breeding standards.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We provide nationwide delivery and ongoing support before, during, and
                after adoption—because our responsibility doesn’t end when your kitten
                goes home.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-coral" />
                  <span className="text-foreground font-medium">Family-Raised</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-coral" />
                  <span className="text-foreground font-medium">Since 2004</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Milestones Along the Way
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="flex gap-6 mb-8 last:mb-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center text-white font-bold text-sm shadow-card">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-coral/20 mt-2" />
                  )}
                </div>
                <Card variant="elevated" className="flex-1 mb-8">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Join Our Family?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We'd love to help you find your perfect feline companion. Reach out 
            to learn more about our available kittens or upcoming litters.
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
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
