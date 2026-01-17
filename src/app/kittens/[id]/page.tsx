"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Phone, Mail, Calendar, DollarSign, MapPin } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Kitten } from "@/data/kittens";
import { useToast } from "@/hooks/use-toast";

export default function KittenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [kitten, setKitten] = useState<Kitten | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKitten() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("kittens")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error || !data) {
          toast({
            title: "Kitten not found",
            description: "This kitten may have been removed or doesn't exist.",
            variant: "destructive",
          });
          router.push("/kittens");
        } else {
          // Map Supabase data to Kitten interface
          setKitten({
            id: String(data.id),
            name: data.name,
            breed: data.breed,
            gender: data.gender,
            ageWeeks: data.age_weeks,
            price: Number(data.price),
            description: data.description,
            mainImageUrl: data.main_image_url,
            extraImageUrls: Array.isArray(data.extra_image_urls) ? data.extra_image_urls : [],
            isAvailable: data.is_available,
          });
        }
      } catch (error) {
        console.error("Error loading kitten:", error);
        toast({
          title: "Error",
          description: "Failed to load kitten details. Please try again.",
          variant: "destructive",
        });
        router.push("/kittens");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadKitten();
    }
  }, [params.id, router, toast]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading kitten details...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!kitten) {
    return null;
  }

  return (
    <PublicLayout>
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link href="/kittens">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to All Kittens
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={kitten.mainImageUrl}
                alt={kitten.name}
                className="w-full h-full object-cover"
              />
            </div>
            {kitten.extraImageUrls && kitten.extraImageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {kitten.extraImageUrls.map((url, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-card">
                    <img
                      src={url}
                      alt={`${kitten.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={kitten.isAvailable ? "available" : "reserved"} className="text-sm px-3 py-1">
                  {kitten.isAvailable ? "Available" : "Reserved"}
                </Badge>
                <Badge variant={kitten.gender === "male" ? "male" : "female"}>
                  {kitten.gender === "male" ? "♂ Male" : "♀ Female"}
                </Badge>
                <Badge variant="breed">{kitten.breed}</Badge>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {kitten.name}
              </h1>
              <p className="text-2xl font-bold text-coral mb-6">
                ${kitten.price.toLocaleString()}
              </p>
            </div>

            <Card variant="elevated">
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  About {kitten.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {kitten.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{kitten.ageWeeks} weeks old</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-muted-foreground">Breed</p>
                      <p className="font-medium">{kitten.breed}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            {kitten.isAvailable && (
              <div className="space-y-4">
                <Link href="/contact" className="block">
                  <Button variant="hero" size="lg" className="w-full gap-2">
                    <Phone className="w-5 h-5" />
                    Inquire About {kitten.name}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Mail className="w-5 h-5" />
                    Send a Message
                  </Button>
                </Link>
              </div>
            )}

            {!kitten.isAvailable && (
              <Card variant="feature" className="border-blush">
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground mb-4">
                    {kitten.name} has been reserved. Check out our other available kittens!
                  </p>
                  <Link href="/kittens">
                    <Button variant="hero" className="w-full">
                      View Available Kittens
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            <Card variant="elevated">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  What's Included
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    Age-appropriate vaccinations
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    Deworming treatments
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    Microchip registration
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    Veterinary health certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    TICA registration papers
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-coral" />
                    1-year genetic health guarantee
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
