"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase-ready backend.
 * 1. Create a project at https://supabase.com
 * 2. Run supabase/schema.sql in the SQL editor
 * 3. Copy .env.local.example → .env.local and fill in your keys
 * Until then, the site runs in "demo mode": forms succeed locally
 * but nothing is persisted.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export const isDemoMode = !supabase;

export interface RsvpEntry {
  first_name: string;
  last_name: string;
  guests: number;
  attending: boolean;
  allergies?: string;
  message?: string;
}

export interface WishEntry {
  name: string;
  message: string;
  created_at?: string;
}

export async function submitRsvp(entry: RsvpEntry): Promise<void> {
  if (!supabase) {
    // Demo mode — simulate latency so the UI flow can be tested.
    await new Promise((r) => setTimeout(r, 700));
    console.info("[demo mode] RSVP not saved:", entry);
    return;
  }
  const { error } = await supabase.from("rsvps").insert(entry);
  if (error) throw error;
}

export async function submitWish(entry: WishEntry): Promise<void> {
  if (!supabase) {
    await new Promise((r) => setTimeout(r, 500));
    console.info("[demo mode] Wish not saved:", entry);
    return;
  }
  const { error } = await supabase.from("wishes").insert(entry);
  if (error) throw error;
}

export async function fetchWishes(): Promise<WishEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("wishes")
    .select("name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}
