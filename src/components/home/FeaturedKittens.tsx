"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KittenCard } from "@/components/kittens/KittenCard";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Kitten } from "@/data/kittens";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeaturedKittens() {
  const [featuredKittens, setFeaturedKittens] = useState<Kitten[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadFeaturedKittens() {
      try {
        // Fetch first 3 available kittens, ordered by most recent
        const { data, error } = await supabase
          .from("kittens")
          .select("*")
          .eq("is_available", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (!error && data) {
          setFeaturedKittens(
            data.map((k) => ({
              id: String(k.id),
              name: k.name,
              breed: k.breed,
              gender: k.gender,
              ageWeeks: k.age_weeks,
              price: k.price,
              description: k.description,
              mainImageUrl: k.main_image_url,
              extraImageUrls: k.extra_image_urls ?? [],
              isAvailable: k.is_available,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load featured kittens from Supabase", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedKittens();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading featured kittens...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredKittens.length === 0) {
    return null; // Don't show section if no kittens available
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-4">
            Available Now
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our Adorable Kittens
          </h2>
          <p className="text-lg text-muted-foreground">
            Each kitten is raised with love, socialized with children and pets, 
            and ready to become part of your family.
          </p>
        </motion.div>

        {/* Kittens Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredKittens.map((kitten) => (
            <motion.div key={kitten.id} variants={itemVariants}>
              <KittenCard {...kitten} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/kittens">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="lg" className="gap-2">
                View All Kittens
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
