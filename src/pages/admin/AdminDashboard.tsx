"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cat,
  Tags,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Heart,
  Eye,
  Loader2,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Kitten, Breed } from "@/data/kittens";

export default function AdminDashboard() {
  const [kittens, setKittens] = useState<Kitten[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [inquiries, setInquiries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadData() {
      try {
        const [
          { data: kittensData, error: kittensError },
          { data: breedsData, error: breedsError },
          { count: inquiriesCount, error: inquiriesError },
        ] = await Promise.all([
          supabase.from("kittens").select("*"),
          supabase.from("breeds").select("*"),
          supabase.from("inquiries").select("*", { count: "exact", head: true }),
        ]);

        if (!kittensError && kittensData) {
          setKittens(
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
            }))
          );
        }

        if (!breedsError && breedsData) {
          setBreeds(
            breedsData.map((b) => ({
              id: String(b.id),
              name: b.name,
              description: b.description,
            }))
          );
        }

        if (!inquiriesError && inquiriesCount !== null) {
          setInquiries(inquiriesCount || 0);
        }
      } catch (error) {
        console.error("Failed to load dashboard data from Supabase", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const stats = [
    {
      title: "Total Kittens",
      value: kittens.length,
      icon: Cat,
      change: "All kittens",
      color: "coral",
    },
    {
      title: "Available",
      value: kittens.filter((k) => k.isAvailable).length,
      icon: Heart,
      change: "Ready for adoption",
      color: "sage",
    },
    {
      title: "Breeds",
      value: breeds.length,
      icon: Tags,
      change: "Active breeds",
      color: "accent",
    },
    {
      title: "Inquiries",
      value: inquiries,
      icon: Users,
      change: "Total inquiries",
      color: "blush",
    },
  ];

  const recentKittens = kittens
    .sort((a, b) => {
      // Sort by most recent (assuming we can add created_at to the mapping)
      return 0;
    })
    .slice(0, 4);
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your cattery.
          </p>
        </div>
        <Link href="/admin/kittens/new">
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Kitten
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat, index) => (
          <Card
            key={stat.title}
            variant="elevated"
            className="animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="font-serif text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === "coral"
                      ? "bg-coral/10"
                      : stat.color === "sage"
                      ? "bg-sage/30"
                      : stat.color === "accent"
                      ? "bg-accent"
                      : "bg-blush"
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === "coral"
                        ? "text-coral"
                        : stat.color === "sage"
                        ? "text-sage-dark"
                        : stat.color === "accent"
                        ? "text-accent-foreground"
                        : "text-coral-dark"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Recent Kittens & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Kittens */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Kittens</CardTitle>
            <Link href="/admin/kittens">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentKittens.length > 0 ? (
              <div className="space-y-4">
                {recentKittens.map((kitten) => (
                <div
                  key={kitten.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <img
                    src={kitten.mainImageUrl}
                    alt={kitten.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {kitten.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {kitten.breed} • {kitten.gender} • {kitten.ageWeeks} weeks
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-coral">
                      ${kitten.price.toLocaleString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        kitten.isAvailable
                          ? "bg-sage/30 text-sage-dark"
                          : "bg-blush text-coral-dark"
                      }`}
                    >
                      {kitten.isAvailable ? "Available" : "Reserved"}
                    </span>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No kittens yet</p>
                <Link href="/admin/kittens/new">
                  <Button variant="outline" size="sm" className="mt-4">
                    Add Your First Kitten
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/kittens/new" className="block">
              <Button variant="soft" className="w-full justify-start gap-3">
                <Plus className="w-4 h-4" />
                Add New Kitten
              </Button>
            </Link>
            <Link href="/admin/breeds/new" className="block">
              <Button variant="soft" className="w-full justify-start gap-3">
                <Tags className="w-4 h-4" />
                Add New Breed
              </Button>
            </Link>
            <Link href="/admin/kittens" className="block">
              <Button variant="soft" className="w-full justify-start gap-3">
                <Eye className="w-4 h-4" />
                Manage Kittens
              </Button>
            </Link>
            <Link href="/" target="_blank" className="block">
              <Button variant="soft" className="w-full justify-start gap-3">
                <TrendingUp className="w-4 h-4" />
                View Public Site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Notice */}
      <Card variant="feature" className="border-coral/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-coral" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Enable Full Admin Features
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                To enable database persistence, authentication, and image uploads, 
                activate Lovable Cloud. This will set up your Supabase backend automatically.
              </p>
              <Button variant="hero" size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
