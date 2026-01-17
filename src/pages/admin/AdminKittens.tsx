"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { Kitten } from "@/data/kittens";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function AdminKittens() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allKittens, setAllKittens] = useState<Kitten[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadKittens() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("kittens")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setAllKittens(
            data.map((k) => ({
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
        } else if (error) {
          console.error("Failed to load kittens from Supabase", error);
        }
      } catch (error) {
        console.error("Failed to load kittens from Supabase", error);
      } finally {
        setLoading(false);
      }
    }

    loadKittens();
  }, []);

  const filteredKittens = allKittens.filter(
    (kitten) =>
      kitten.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kitten.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Kittens
          </h1>
          <p className="text-muted-foreground">
            Manage your kitten listings
          </p>
        </div>
        <Link href="/admin/kittens/new">
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Kitten
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search kittens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
                  <TableHead>Kitten</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKittens.map((kitten) => (
                <TableRow key={kitten.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={kitten.mainImageUrl}
                        alt={kitten.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium">{kitten.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="breed">{kitten.breed}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={kitten.gender === "male" ? "male" : "female"}>
                      {kitten.gender === "male" ? "♂ Male" : "♀ Female"}
                    </Badge>
                  </TableCell>
                  <TableCell>{kitten.ageWeeks} weeks</TableCell>
                  <TableCell className="font-medium">
                    ${kitten.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={kitten.isAvailable ? "available" : "reserved"}>
                      {kitten.isAvailable ? "Available" : "Reserved"}
                    </Badge>
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
                          <Link href={`/kittens/${kitten.id}`} className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/kittens/${kitten.id}/edit`}
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

          {!loading && filteredKittens.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? "No kittens found matching your search" : "No kittens found"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
