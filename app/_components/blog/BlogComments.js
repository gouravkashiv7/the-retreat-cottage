"use client";

import { useTransition } from "react";
import { addComment } from "@/app/_lib/blog-actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";

export default function BlogComments({ blogId, initialComments = [] }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  async function handleCommentSubmit(formData) {
    if (!session) {
      toast.error("Please login to post a comment.");
      return;
    }

    startTransition(async () => {
      try {
        await addComment(formData);
        toast.success("Comment posted successfully!");
        // Refresh handled by revalidatePath
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <div className="mt-24 max-w-4xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
        <MessageSquare className="h-8 w-8 text-accent-500" />
        <h3 className="text-2xl sm:text-3xl font-black text-white px-2">
          Suggest places to be added to this list
        </h3>
      </div>

      {/* Comment Form */}
      <div className="mb-16 bg-primary-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 shadow-2xl">
        {session ? (
          <form action={handleCommentSubmit} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-10 h-10 rounded-full border border-accent-500/30 overflow-hidden bg-primary-800">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    fill
                    sizes="40px"
                    className="object-cover"
                    alt={session.user.name}
                  />
                ) : (
                  <User className="h-6 w-6 m-2 text-accent-500/50" />
                )}
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  {session.user.name}
                </p>
                <p className="text-primary-400 text-[10px] uppercase font-black">
                  Logged In
                </p>
              </div>
            </div>

            <input type="hidden" name="blogId" value={blogId} />
            <textarea
              name="content"
              required
              placeholder="Tell us about a hidden gem or a must-visit spot we should include..."
              className="w-full p-5 bg-primary-800/40 border border-white/10 rounded-2xl text-primary-100 placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 outline-none transition-all resize-none min-h-[140px] text-lg"
            />
            <div className="flex justify-end">
              <button
                disabled={isPending}
                className="flex items-center gap-3 px-8 py-3 bg-accent-500 hover:bg-accent-400 text-primary-950 font-black rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-xl shadow-accent-500/10 group"
              >
                {isPending ? "Submitting..." : "Submit Suggestion"}
                <Send
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isPending ? "opacity-0" : "opacity-100"}`}
                />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-10">
            <p className="text-primary-300 text-lg mb-6 leading-relaxed">
              Login to suggest a new place for our travel guide.
            </p>
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-accent-500/20 via-yellow-500/20 to-accent-500/20">
              <div className="bg-primary-900 rounded-xl px-8 py-3 border border-white/5 font-black text-accent-500">
                Sign in to Suggest
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comment List */}
      <div className="space-y-8 pb-32">
        {initialComments.length === 0 ? (
          <p className="text-center text-primary-400 py-10 italic">
            No suggestions yet. Be the first to recommend a place!
          </p>
        ) : (
          initialComments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="relative w-12 h-12 rounded-2xl border border-white/10 overflow-hidden bg-primary-800 shrink-0 shadow-lg">
                {comment.guests?.image ? (
                  <Image
                    src={comment.guests.image}
                    fill
                    sizes="48px"
                    className="object-cover"
                    alt={comment.guests.fullName}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-800 text-accent-500 font-black text-xl">
                    {comment.guests?.fullName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-lg">
                    {comment.guests?.fullName}
                  </span>
                  <span className="text-[10px] uppercase font-black text-primary-500 tracking-widest bg-primary-800/50 px-2 py-0.5 rounded border border-white/5">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-primary-200 text-lg leading-relaxed bg-primary-900/40 rounded-2xl p-6 border border-white/5">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
