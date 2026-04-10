"use server";

import { auth } from "./auth";
import { supabaseAdmin } from "./supabase";
import { revalidatePath } from "next/cache";

export async function addFeedback(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to leave feedback.");

  const content = formData.get("content");
  console.log("Adding feedback for guest ID:", session.user.guestId);
  const guestId = session.user.guestId;

  if (!content || content.trim().length === 0) {
    throw new Error("Feedback cannot be empty.");
  }

  const newFeedback = {
    content,
    guest_id: guestId,
  };

  const { error } = await supabaseAdmin.from("feedbacks").insert([newFeedback]);

  if (error) {
    console.error("❌ Error adding feedback:", error);
    if (error.code === "42P01") {
      // Create table if it doesn't exist (fail-safe for this demo)
      // This is not recommended for production but helps during development if migrations aren't synced.
      console.warn("Table 'feedbacks' not found. This needs to be created in Supabase.");
    }
    throw new Error("Could not add feedback. Please try again.");
  }

  revalidatePath("/feedback");
}

export async function getFeedbacks() {
  const { data, error } = await supabaseAdmin
    .from("feedbacks")
    .select(
      `
            id,
            content,
            created_at,
            guests (
                fullName,
                image
            )
        `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === "42P01") return []; // Table doesn't exist yet
    console.error(
      "❌ Error fetching feedbacks:",
      JSON.stringify(error, null, 2),
    );
    return [];
  }

  return data;
}
