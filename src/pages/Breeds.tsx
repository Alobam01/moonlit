"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { Breed } from "@/data/kittens";
import { Loader2, PawPrint } from "lucide-react";

const breedImages: Record<string, string> = {
  Ragdoll:
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=400&fit=crop",
  Persian:
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop",
  "British Shorthair":
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop",
  "Maine Coon":
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=400&fit=crop",
  "Scottish Fold":
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop",
};

const defaultBreedImage =
  "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=400&fit=crop";

export default function Breeds() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadBreeds() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("breeds")
          .select("*")
          .order("name", { ascending: true });

        if (!error && data) {
          setBreeds(
            data.map((b) => ({
              id: String(b.id),
              name: b.name,
              description: b.description,
            })),
          );
        } else if (error) {
          console.error("Failed to load breeds from Supabase", error);
        }
      } catch (err) {
        console.error("Failed to load breeds from Supabase", err);
      } finally {
        setLoading(false);
      }
    }

    loadBreeds();
  }, []);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
              Our Breeds
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet Our{" "}
              <span className="text-gradient block">Beloved Breeds</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn more about the breeds we specialize in, their personalities,
              and what makes each one a perfect companion.
            </p>
          </div>
        </div>
      </section>

      {/* Breeds Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading breeds...</p>
            </div>
          ) : breeds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <PawPrint className="w-10 h-10 text-muted-foreground mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                No breeds found
              </h2>
              <p className="text-muted-foreground">
                Once you add breeds in the admin dashboard, they will appear here.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breeds.map((breed, index) => {
                const imageUrl = breedImages[breed.name] ?? defaultBreedImage;
                return (
                  <Card
                    key={breed.id}
                    variant="feature"
                    className="overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={breed.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-serif text-2xl font-semibold text-foreground">
                          {breed.name}
                        </h2>
                        <Badge variant="outline" className="text-xs">
                          Purebred
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {breed.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

