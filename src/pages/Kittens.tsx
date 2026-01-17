"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { KittenCard } from "@/components/kittens/KittenCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Kitten, Breed } from "@/data/kittens";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Search, Filter, X, Loader2 } from "lucide-react";

export default function Kittens() {
  const searchParams = useSearchParams();
  const [allKittens, setAllKittens] = useState<Kitten[]>([]);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadData() {
      setLoading(true);
      try {
        const [{ data: kittensData, error: kittensError }, { data: breedsData, error: breedsError }] =
          await Promise.all([
            supabase.from("kittens").select("*").order("created_at", { ascending: false }),
            supabase.from("breeds").select("*").order("name", { ascending: true }),
          ]);

        if (!kittensError && kittensData) {
          setAllKittens(
            kittensData.map((k) => ({
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
            })),
          );
        } else if (kittensError) {
          console.error("Failed to load kittens from Supabase", kittensError);
        }

        if (!breedsError && breedsData) {
          setAllBreeds(
            breedsData.map((b) => ({
              id: String(b.id),
              name: b.name,
              description: b.description,
            })),
          );
        } else if (breedsError) {
          console.error("Failed to load breeds from Supabase", breedsError);
        }
      } catch (error) {
        console.error("Failed to load data from Supabase", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Handle breed query parameter from URL
  useEffect(() => {
    const breedParam = searchParams.get("breed");
    if (breedParam && allBreeds.length > 0) {
      // Try to find exact match first
      const breed = allBreeds.find(
        (b) => b.name.toLowerCase() === decodeURIComponent(breedParam).toLowerCase()
      );
      if (breed) {
        setSelectedBreed(breed.name);
      }
    }
  }, [searchParams, allBreeds]);

  const filteredKittens = useMemo(() => {
    return allKittens.filter((kitten) => {
      if (selectedBreed !== "all" && kitten.breed !== selectedBreed) return false;
      if (selectedGender !== "all" && kitten.gender !== selectedGender) return false;
      if (showAvailableOnly && !kitten.isAvailable) return false;
      return true;
    });
  }, [allKittens, selectedBreed, selectedGender, showAvailableOnly]);

  const hasFilters = selectedBreed !== "all" || selectedGender !== "all" || showAvailableOnly;

  const clearFilters = () => {
    setSelectedBreed("all");
    setSelectedGender("all");
    setShowAvailableOnly(false);
  };

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 gradient-warm">
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
            Find Your Companion
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Available Kittens
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each of our kittens is raised with love, fully vaccinated, and ready 
            to become part of your family.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Breed Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBreed === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBreed("all")}
              >
                All Breeds
              </Button>
              {allBreeds.map((breed) => (
                <Button
                  key={breed.id}
                  variant={selectedBreed === breed.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBreed(breed.name)}
                >
                  {breed.name}
                </Button>
              ))}
            </div>

            <div className="w-px h-6 bg-border hidden md:block" />

            {/* Gender Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedGender === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGender("all")}
              >
                All
              </Button>
              <Button
                variant={selectedGender === "male" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGender("male")}
              >
                ♂ Male
              </Button>
              <Button
                variant={selectedGender === "female" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGender("female")}
              >
                ♀ Female
              </Button>
            </div>

            <div className="w-px h-6 bg-border hidden md:block" />

            {/* Available Only Toggle */}
            <Button
              variant={showAvailableOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            >
              Available Only
            </Button>

            {/* Clear Filters */}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1 text-muted-foreground"
              >
                <X className="w-3 h-3" />
                Clear
              </Button>
            )}

            <div className="ml-auto text-sm text-muted-foreground">
              {filteredKittens.length} kitten{filteredKittens.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </section>

      {/* Kittens Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading kittens...</p>
            </div>
          ) : filteredKittens.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredKittens.map((kitten, index) => (
                <div
                  key={kitten.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <KittenCard {...kitten} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                No Kittens Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or check back later for new arrivals.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Interest CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Didn't Find What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Join our waiting list to be notified about upcoming litters. We're happy 
            to help you find your perfect match.
          </p>
          <Button variant="hero" size="lg">
            Join Waiting List
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
