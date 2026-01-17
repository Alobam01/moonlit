"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.4, 0, 0.2, 1] as const,
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            >
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                20+ Years of Excellence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Discover Your
              <span className="block text-gradient">Furry Companion</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Welcome to Purrfect Haven, where every kitten is raised with love 
              in our family home. Experience the joy of finding your perfect 
              feline friend.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/kittens">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="xl" className="gap-2">
                    View Available Kittens
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="xl" className="glass-button">
                    Learn About Us
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { icon: Shield, label: "Health Guaranteed" },
                { icon: Heart, label: "Home-Raised" },
                { icon: Award, label: "TICA Registered" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center">
                    <badge.icon className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <motion.div
                className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1000&fit=crop"
                  alt="Beautiful kitten"
                  className="w-full h-full object-cover"
                />
                {/* Glass overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              
              {/* Floating card */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4"
                animate={floatAnimation}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-bold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Happy Families</p>
                  </div>
                </div>
              </motion.div>

              {/* Second floating card */}
              <motion.div
                className="absolute -top-4 -right-4 glass-card rounded-xl p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${
                            i === 1 ? "1495360010541-f48722b34f7d" : 
                            i === 2 ? "1533738363-b7f9aef128ce" : 
                            "1573865526739-10659fec78a5"
                          }?w=50&h=50&fit=crop`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    ⭐️ 5.0 Reviews
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
