"use client";

import { Heart, Home, Stethoscope, Award, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Home,
    title: "Home-Raised with Love",
    description:
      "Our kittens grow up in our family home, not in cages. They're socialized with children, dogs, and daily household activities.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Health Care",
    description:
      "Regular vet check-ups, age-appropriate vaccinations, deworming, and thorough health screenings before they go home.",
  },
  {
    icon: Award,
    title: "TICA Registered",
    description:
      "All our breeding cats are TICA registered with documented pedigrees. Each kitten comes with registration papers.",
  },
  {
    icon: Heart,
    title: "1-Year Health Guarantee",
    description:
      "We stand behind the health of our kittens with a comprehensive genetic health guarantee for your peace of mind.",
  },
  {
    icon: Users,
    title: "Lifetime Support",
    description:
      "Our relationship doesn't end at adoption. We provide ongoing support and guidance throughout your kitten's life.",
  },
  {
    icon: Clock,
    title: "20+ Years Experience",
    description:
      "Two decades of ethical breeding practices, genetic health focus, and dedication to producing exceptional kittens.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function WhyChooseUs() {
  return (
    <section className="py-24 gradient-warm relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-accent-foreground text-sm font-medium mb-4">
            Why Purrfect Haven
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            A Commitment to Excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            We're not just breeders – we're a family dedicated to raising 
            healthy, happy, and well-adjusted kittens.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Card
                variant="feature"
                className="glass-card group cursor-pointer h-full"
              >
                <CardContent className="p-8">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
