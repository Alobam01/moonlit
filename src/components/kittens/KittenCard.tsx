"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface KittenCardProps {
  id: string;
  name: string;
  breed: string;
  gender: "male" | "female";
  ageWeeks: number;
  price: number;
  description: string;
  mainImageUrl: string;
  isAvailable: boolean;
}

export function KittenCard({
  id,
  name,
  breed,
  gender,
  ageWeeks,
  price,
  description,
  mainImageUrl,
  isAvailable,
}: KittenCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card variant="kitten" className="group overflow-hidden glass-card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={mainImageUrl}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Status badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant={isAvailable ? "available" : "reserved"} className="backdrop-blur-md">
              {isAvailable ? "Available" : "Reserved"}
            </Badge>
          </motion.div>

          {/* Favorite button */}
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-button flex items-center justify-center shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.15, backgroundColor: "hsl(0 0% 100% / 0.9)" }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Heart className="w-5 h-5 text-primary" />
          </motion.button>

          {/* Quick view button */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <Link href={`/kittens/${id}`}>
              <Button variant="hero" className="w-full gap-2 backdrop-blur-md">
                View Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="p-6 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{breed}</p>
            </div>
            <motion.div
              className="text-right"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-serif text-xl font-bold text-primary">
                ${price.toLocaleString()}
              </p>
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2">
            <Badge variant={gender === "male" ? "male" : "female"} className="backdrop-blur-sm">
              {gender === "male" ? "♂ Male" : "♀ Female"}
            </Badge>
            <Badge variant="outline" className="backdrop-blur-sm">{ageWeeks} weeks old</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
