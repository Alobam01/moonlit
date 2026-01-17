"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to Find Your
            <motion.span
              className="block text-gradient"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Purrfect Companion?
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Browse our available kittens or get in touch to learn more about 
            our upcoming litters. Your new family member is waiting!
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/kittens">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="xl" className="gap-2">
                  View Available Kittens
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="xl" className="gap-2 glass-button">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="tel:+15551234567"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors glass-card px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-5 h-5" />
              <span>(555) 123-4567</span>
            </motion.a>
            <motion.a
              href="mailto:hello@purrfecthaven.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors glass-card px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-5 h-5" />
              <span>hello@purrfecthaven.com</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
