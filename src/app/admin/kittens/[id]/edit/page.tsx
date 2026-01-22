"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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
import type { Breed } from "@/data/kittens";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { useImageKitUpload } from "@/hooks/use-imagekit-upload";

export default function AdminEditKittenPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  
  // ImageKit upload hook
  const { uploadImage, isUploading: isImageUploading } = useImageKitUpload({
    folder: "/kittens",
    useUniqueFileName: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    gender: "male",
    ageWeeks: "",
    price: "",
    description: "",
    isAvailable: "true",
  });

  useEffect(() => {
    async function loadBreeds() {
      try {
        const { data, error } = await supabase
          .from("breeds")
          .select("id, name, description")
          .order("name", { ascending: true });
        if (!error && data) {
          setBreeds(
            data.map((b) => ({
              id: String(b.id),
              name: b.name,
              description: b.description,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to load breeds", error);
      }
    }

    loadBreeds();
  }, [supabase]);

  useEffect(() => {
    async function loadKitten() {
      if (!params.id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("kittens")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setFormData({
            name: data.name,
            breed: data.breed,
            gender: data.gender,
            ageWeeks: String(data.age_weeks || ""),
            price: String(data.price || ""),
            description: data.description || "",
            isAvailable: data.is_available ? "true" : "false",
          });
          setCurrentImageUrl(data.main_image_url || "");
        }
      } catch (error: unknown) {
        console.error("Failed to load kitten:", error);
        toast({
          title: "Error",
          description: "Failed to load kitten.",
          variant: "destructive",
        });
        router.push("/admin/kittens");
      } finally {
        setLoading(false);
      }
    }

    loadKitten();
  }, [params.id, supabase, toast, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.breed || !formData.description) {
      toast({
        title: "Missing information",
        description: "Name, breed, and description are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = currentImageUrl;

      // Only upload new image if one was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Update kitten in Supabase
      const { error } = await supabase
        .from("kittens")
        .update({
          name: formData.name,
          breed: formData.breed,
          gender: formData.gender,
          age_weeks: Number(formData.ageWeeks || 0),
          price: Number(formData.price || 0),
          description: formData.description,
          main_image_url: imageUrl,
          is_available: formData.isAvailable === "true",
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id);

      if (error) {
        console.error("Supabase update error", error);
        throw new Error("Failed to update kitten");
      }

      toast({
        title: "Kitten updated",
        description: "The kitten has been updated successfully.",
      });

      router.push("/admin/kittens");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Could not update kitten. Please try again.",
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
        <Link href="/admin/kittens">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Edit Kitten</h1>
          <p className="text-muted-foreground">
            Update kitten details and images
          </p>
        </div>
      </div>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Kitten Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Select
                  value={formData.breed}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, breed: value }))}
                >
                  <SelectTrigger id="breed">
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((breed) => (
                      <SelectItem key={breed.id} value={breed.name}>
                        {breed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageWeeks">Age (weeks)</Label>
                <Input
                  id="ageWeeks"
                  name="ageWeeks"
                  type="number"
                  min={0}
                  value={formData.ageWeeks}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainImage">Main Image</Label>
                {currentImageUrl && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current kitten"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                  {imageFile
                    ? `New image selected: ${imageFile.name}`
                    : "Leave empty to keep current image. New image will be uploaded to ImageKit."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="isAvailable">Availability</Label>
                <Select
                  value={formData.isAvailable}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, isAvailable: value }))}
                >
                  <SelectTrigger id="isAvailable">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/admin/kittens">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="hero"
                disabled={isSubmitting || isImageUploading}
                className="gap-2"
              >
                {isSubmitting || isImageUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isImageUploading ? "Uploading image..." : "Updating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Kitten
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
