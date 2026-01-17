"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import { Breed, Kitten } from "@/data/kittens";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function AdminBreeds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [allKittens, setAllKittens] = useState<Kitten[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadData() {
      setLoading(true);
      try {
        const [{ data: breedsData, error: breedsError }, { data: kittensData, error: kittensError }] =
          await Promise.all([
            supabase.from("breeds").select("*").order("name", { ascending: true }),
            supabase.from("kittens").select("*"),
          ]);

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
      } catch (error) {
        console.error("Failed to load data from Supabase", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredBreeds = allBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count kittens per breed
  const getKittenCount = (breedName: string) => {
    return allKittens.filter((k) => k.breed === breedName).length;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Breeds
          </h1>
          <p className="text-muted-foreground">
            Manage your breed categories
          </p>
        </div>
        <Link href="/admin/breeds/new">
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Breed
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card variant="elevated">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Breed Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Kittens</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBreeds.map((breed) => (
                <TableRow key={breed.id}>
                  <TableCell>
                    <span className="font-medium">{breed.name}</span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-muted-foreground truncate">
                      {breed.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getKittenCount(breed.name)} kittens</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/breeds/${breed.id}/edit`}
                            className="flex items-center gap-2"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && filteredBreeds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? "No breeds found matching your search" : "No breeds found"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
