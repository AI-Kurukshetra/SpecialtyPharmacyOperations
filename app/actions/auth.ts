"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const allowedStaffRoutes = new Set([
  "/dashboard",
  "/patients",
  "/prescriptions",
  "/prior-authorizations",
  "/tasks",
]);

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getSafeStaffRoute(value: string): Route {
  if (allowedStaffRoutes.has(value)) {
    return value as Route;
  }

  return "/dashboard";
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = getSafeStaffRoute(getString(formData, "next"));

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?type=error&message=${encodeURIComponent(error.message)}` as Route);
  }

  revalidatePath("/", "layout");
  redirect(
    `${next}?type=success&message=${encodeURIComponent("Signed in successfully.")}` as Route,
  );
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(`/signup?type=error&message=${encodeURIComponent(error.message)}` as Route);
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect("/dashboard?type=success&message=Welcome%20to%20RxConnect." as Route);
  }

  redirect(
    "/login?type=success&message=Account%20created.%20Confirm%20your%20email%20if%20your%20Supabase%20project%20requires%20it." as Route,
  );
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login?type=success&message=Signed%20out%20successfully." as Route);
}
