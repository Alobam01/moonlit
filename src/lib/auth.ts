"use client";

import { createSupabaseBrowserClient } from "./supabaseClient";
import { useRouter } from "next/navigation";

/**
 * Sign in admin user with email and password
 */
export async function signInAdmin(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign out admin user
 */
export async function signOutAdmin() {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

/**
 * Get current admin session
 */
export async function getAdminSession() {
  const supabase = createSupabaseBrowserClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return session;
}

/**
 * Check if current user is admin
 * You can customize this to check for a specific role or email domain
 */
export async function isAdmin() {
  const session = await getAdminSession();
  if (!session?.user) return false;
  
  // Option 1: Check if user email is in admin list (you can store this in a table)
  // Option 2: Check user metadata for admin role
  // For now, we'll allow any authenticated user to be admin
  // You can restrict this later by checking user metadata or a separate admin_users table
  
  return true;
}
