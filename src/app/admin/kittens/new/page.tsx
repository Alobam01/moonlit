"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Upload, Save, Loader2 } from "lucide-react";
import { useImageKitUpload } from "@/hooks/use-imagekit-upload";

export default function AdminNewKittenPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast({
        title: "Main image required",
        description: "Please upload a main image for this kitten.",
        variant: "destructive",
      });
      return;
    }

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
      // 1. Upload image to ImageKit
      const imageUrl = await uploadImage(imageFile);

      // 2. Insert kitten into Supabase
      const { error } = await supabase.from("kittens").insert({
        name: formData.name,
        breed: formData.breed,
        gender: formData.gender,
        age_weeks: Number(formData.ageWeeks || 0),
        price: Number(formData.price || 0),
        description: formData.description,
        main_image_url: imageUrl,
        extra_image_urls: [],
        is_available: formData.isAvailable === "true",
      });

      if (error) {
        console.error("Supabase insert error", error);
        throw new Error("Failed to save kitten");
      }

      toast({
        title: "Kitten added",
        description: "The kitten has been added successfully.",
      });

      router.push("/admin/kittens");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Could not add kitten. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Add New Kitten</h1>
          <p className="text-muted-foreground">
            Upload images with ImageKit and save kitten details to Supabase.
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
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                  This image will be uploaded to ImageKit.
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
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/kittens")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={isSubmitting || isImageUploading} className="gap-2">
                {isSubmitting || isImageUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isImageUploading ? "Uploading image..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <Save className="w-4 h-4" />
                    Save Kitten
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

