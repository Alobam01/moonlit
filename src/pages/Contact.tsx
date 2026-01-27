"use client";

import React, { useState, useEffect } from "react";
import { Send, Heart } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

interface Breed {
  id: string;
  name: string;
  description: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    message: "",
    interestedKitten: "",
    preferredBreed: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadBreeds() {
      setLoadingBreeds(true);
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
        } else if (error) {
          console.error("Failed to load breeds from Supabase", error);
        }
      } catch (err) {
        console.error("Failed to load breeds from Supabase", err);
      } finally {
        setLoadingBreeds(false);
      }
    }

    loadBreeds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const detailedMessage = `${formData.message}\n\nAdditional Details:\n- Address: ${formData.address}, ${formData.city}, ${formData.state}\n- Preferred Breed: ${formData.preferredBreed}\n- Preferred Contact Method: ${formData.budget}\n- Timeline: ${formData.timeline}\n- Interested Kitten: ${formData.interestedKitten}`;

      // Map form data to existing contact API fields
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        breed: formData.preferredBreed,
        message: detailedMessage,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        message: "",
        interestedKitten: "",
        preferredBreed: "",
        budget: "",
        timeline: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-cream-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-gold-600 via-gold-500 to-secondary-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4  text-gray-900">CONTACT US</h1>
            <p className="text-xl text-gold-50/90 font-bold text-gray-900">
              Ready to find your perfect kitten? We&apos;d love to hear from you!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
           

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-surface p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-cream-100 border border-gold-200 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-gold-600 mr-2" />
                      <p className="text-gold-800 font-medium">
                        Thank you for contacting us!
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">
                      We&apos;ve received your information and will get back to you as soon as
                      possible. We look forward to helping you find the perfect companion!
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Oops! Something went wrong.</p>
                    <p className="text-red-700 text-sm mt-1">
                      Please try again or contact us directly via email or phone.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferredBreed"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Breed *
                      </label>
                      <select
                        id="preferredBreed"
                        name="preferredBreed"
                        value={formData.preferredBreed}
                        onChange={handleChange}
                        required
                        disabled={loadingBreeds}
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {loadingBreeds ? "Loading breeds..." : "Select a breed"}
                        </option>
                        {breeds.map((breed) => (
                          <option key={breed.id} value={breed.name}>
                            {breed.name}
                          </option>
                        ))}
                        <option value="No preference">No preference</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                        placeholder="Enter your city"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        How do you wish to be contacted? *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                      >
                        <option value="">Select preferred contact method</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                      >
                        <option value="">When are you looking</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 week">Within 1 week</option>
                        <option value="Within 2 weeks">Within 2 weeks</option>
                        <option value="Within 3 weeks">Within 3 weeks</option>
                        <option value="Within 1 - 3 months">Within 1 - 3 months</option>
                        <option value="Just browsing">Just browsing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="interestedKitten"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Specific Kitten Interest *
                    </label>
                    <input
                      type="text"
                      id="interestedKitten"
                      name="interestedKitten"
                      value={formData.interestedKitten}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors bg-white"
                      placeholder="Name of specific kitten you're interested in (or 'None' if just browsing)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-400 transition-colors resize-none bg-white"
                      placeholder="Tell us about yourself, your experience with cats, your living situation, and what you're looking for in a kitten..."
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-secondary-500 text-dark font-semibold rounded-xl hover:from-gold-700 hover:via-gold-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;
