"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Save, Loader2, ArrowLeft } from "lucide-react";

export default function AdminEditBreedPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function loadBreed() {
      if (!params.id) return;

      try {
        const { data, error } = await supabase
          .from("breeds")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setFormData({
            name: data.name,
            description: data.description ?? "",
          });
        }
      } catch (error: unknown) {
        console.error("Failed to load breed:", error);
        toast({
          title: "Error",
          description: "Failed to load breed.",
          variant: "destructive",
        });
        router.push("/admin/breeds");
      } finally {
        setLoading(false);
      }
    }

    loadBreed();
  }, [params.id, supabase, toast, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast({
        title: "Missing information",
        description: "Name and description are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("breeds")
        .update({
          name: formData.name,
          description: formData.description,
        })
        .eq("id", params.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Breed updated successfully.",
      });

      router.push("/admin/breeds");
    } catch (error: unknown) {
      console.error("Failed to update breed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update breed.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/breeds">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Edit Breed
          </h1>
          <p className="text-muted-foreground">
            Update breed name and description
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Breed Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Breed Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ragdoll"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the temperament, care needs, and personality of this breed..."
                rows={6}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="hero"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Breed
                  </>
                )}
              </Button>
              <Link href="/admin/breeds">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

