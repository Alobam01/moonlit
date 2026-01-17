"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminEditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "5",
    text: "",
    avatar: "",
    kittenName: "",
  });

  useEffect(() => {
    async function loadTestimonial() {
      if (!params.id) return;

      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setFormData({
            name: data.name,
            location: data.location,
            rating: String(data.rating),
            text: data.text,
            avatar: data.avatar || "",
            kittenName: data.kitten_name || "",
          });
        }
      } catch (error: unknown) {
        console.error("Failed to load testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonial.",
          variant: "destructive",
        });
        router.push("/admin/testimonials");
      } finally {
        setLoading(false);
      }
    }

    loadTestimonial();
  }, [params.id, supabase, toast, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.text) {
      toast({
        title: "Missing information",
        description: "Name, location, and text are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: formData.name,
          location: formData.location,
          rating: parseInt(formData.rating),
          text: formData.text,
          avatar: formData.avatar || null,
          kitten_name: formData.kittenName || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });

      router.push("/admin/testimonials");
    } catch (error: unknown) {
      console.error("Failed to update testimonial:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update testimonial.";
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
        <Link href="/admin/testimonials">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Edit Testimonial
          </h1>
          <p className="text-muted-foreground">
            Update testimonial details
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Testimonial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Customer name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, rating: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kittenName">Kitten Name (Optional)</Label>
                <Input
                  id="kittenName"
                  name="kittenName"
                  value={formData.kittenName}
                  onChange={handleChange}
                  placeholder="Name of adopted kitten"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Testimonial Text *</Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Customer testimonial..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL (Optional)</Label>
              <Input
                id="avatar"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use initial letter avatar
              </p>
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
                    Update Testimonial
                  </>
                )}
              </Button>
              <Link href="/admin/testimonials">
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
