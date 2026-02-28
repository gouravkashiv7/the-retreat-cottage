"use server";

import { auth } from "./auth";
import { supabaseAdmin } from "./supabase";
import { revalidatePath } from "next/cache";

export async function addComment(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to comment.");

  const blogId = formData.get("blogId");
  const content = formData.get("content");
  const guestId = session.user.guestId;

  if (!content || content.trim().length === 0) {
    throw new Error("Comment cannot be empty.");
  }

  const newComment = {
    blog_id: blogId,
    content,
    guest_id: guestId,
  };

  const { error } = await supabaseAdmin
    .from("blog_comments")
    .insert([newComment]);

  if (error) {
    console.error("❌ Error adding comment:", error);
    if (error.code === "42P01") {
      throw new Error(
        "Commenting system is being initialized. Please try again in 1 minute.",
      );
    }
    throw new Error("Could not add comment. Please try again.");
  }

  revalidatePath(`/guides/${blogId}`);
}

export async function getComments(blogId) {
  const { data, error } = await supabaseAdmin
    .from("blog_comments")
    .select(
      `
            id,
            content,
            created_at,
            guests (
                fullName
            )
        `,
    )
    .eq("blog_id", blogId)
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === "42P01") return []; // Table doesn't exist yet
    console.error(
      "❌ Error fetching comments:",
      JSON.stringify(error, null, 2),
    );
    return [];
  }

  return data;
}
