"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Breed } from "@/data/kittens";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    breed: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", breed: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a few minutes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadBreeds() {
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
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load breeds:", error);
      }
    }

    loadBreeds();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We'd Love to
              <span className="text-gradient block">Hear from You</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our kittens or the adoption process? 
              We're here to help you find your perfect companion.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="animate-fade-up">
              <Card variant="elevated">
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="breed">Breed Interest</Label>
                        <Select
                          value={formData.breed}
                          onValueChange={(value) =>
                            setFormData({ ...formData, breed: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a breed" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Breed</SelectItem>
                            {breeds.map((breed) => (
                              <SelectItem key={breed.id} value={breed.name}>
                                {breed.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about yourself and what you're looking for..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Our Location
                      </h3>
                      <p className="text-muted-foreground">
                        123 Purrfect Lane<br />
                        Whisker Valley, CA 90210
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Phone Number
                      </h3>
                      <a
                        href="tel:+15551234567"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email Address
                      </h3>
                      <a
                        href="mailto:hello@purrfecthaven.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        hello@purrfecthaven.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Response Time
                      </h3>
                      <p className="text-muted-foreground">
                        We respond to all inquiries within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* FAQ Teaser */}
              <Card variant="feature" className="mt-8">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    Quick Questions?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Check our adoption process and health guarantee pages for 
                    answers to common questions.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="soft" size="sm" asChild>
                      <a href="/adoption">Adoption Process</a>
                    </Button>
                    <Button variant="soft" size="sm" asChild>
                      <a href="/health">Health Guarantee</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-secondary relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
