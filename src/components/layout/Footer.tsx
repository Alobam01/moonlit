"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Breed } from "@/data/kittens";

export function Footer() {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadBreeds() {
      try {
        const { data, error } = await supabase
          .from("breeds")
          .select("*")
          .order("name", { ascending: true })
          .limit(5);

        if (!error && data) {
          setBreeds(
            data.map((b) => ({
              id: String(b.id),
              name: b.name,
              description: b.description,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load breeds for footer:", error);
      }
    }

    loadBreeds();
  }, []);

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground">
                Moonlit Elegance Kittens
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A family-owned cattery with 20+ years of experience, dedicated to 
              raising healthy, well-socialized kittens in a loving home environment.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shadow-soft"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shadow-soft"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/kittens", label: "Available Kittens" },
                { href: "/about", label: "About Us" },
                { href: "/adoption", label: "Adoption Process" },
                { href: "/health", label: "Health Guarantee" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Breeds */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-foreground">
              Our Breeds
            </h4>
            <ul className="space-y-2">
              {breeds.length > 0 ? (
                breeds.map((breed) => (
                  <li key={breed.id}>
                    <Link
                      href={`/kittens?breed=${encodeURIComponent(breed.name)}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {breed.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground text-sm">Loading breeds...</li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Purrfect Lane, Whisker Valley, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:hello@purrfecthaven.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@purrfecthaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Moonlit Elegance Kittens. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
