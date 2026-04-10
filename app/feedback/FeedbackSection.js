"use client";

import { useTransition } from "react";
import { addFeedback } from "@/app/_lib/feedback-actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MessageSquare, Send, User, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackSection({ initialFeedbacks = [] }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  async function handleFeedbackSubmit(formData) {
    if (!session) {
      toast.error("Please login to leave feedback.");
      return;
    }

    startTransition(async () => {
      try {
        await addFeedback(formData);
        toast.success("Thank you for your feedback!");
        // We'll reset the form here if we have a ref
        const form = document.getElementById("feedback-form");
        if (form) form.reset();
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-6 font-primary">
      <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
        <MessageSquare className="h-8 w-8 text-accent-500" />
        <h3 className="text-2xl sm:text-3xl font-black text-white px-2">
           Latest Feedback
        </h3>
      </div>

      {/* Feedback Form */}
      <div className="mb-20 bg-primary-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:text-accent-500/10 transition-colors">
            <MessageSquare className="h-24 w-24" />
        </div>
        
        {session ? (
          <form id="feedback-form" action={handleFeedbackSubmit} className="space-y-6 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full border-2 border-accent-500/30 overflow-hidden bg-primary-800 ring-4 ring-primary-950 shadow-2xl transition-transform hover:scale-110">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    fill
                    sizes="48px"
                    className="object-cover"
                    alt={session.user.name}
                  />
                ) : (
                  <User className="h-8 w-8 m-2 text-accent-500/50" />
                )}
              </div>
              <div className="text-left">
                <p className="text-white font-black text-base leading-tight">
                  {session.user.name}
                </p>
                <p className="text-accent-500 text-[10px] uppercase font-black tracking-widest mt-0.5">
                  Guest & Contributor
                </p>
              </div>
            </div>

            <textarea
              name="content"
              required
              placeholder="Tell us about your experience..."
              className="w-full p-6 bg-primary-800/40 border border-white/10 rounded-2xl text-primary-100 placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 outline-none transition-all resize-none min-h-35 text-lg"
            />
            <div className="flex justify-end">
              <button
                disabled={isPending}
                className="flex items-center gap-3 px-10 py-4 bg-accent-500 hover:bg-accent-400 text-primary-950 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-xl shadow-accent-500/10 group"
              >
                {isPending ? "Sharing..." : "Share Feedback"}
                <Send
                  className={`h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isPending ? "opacity-0" : "opacity-100"}`}
                />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 relative z-10">
            <p className="text-primary-300 text-xl mb-8 leading-relaxed max-w-md mx-auto">
              Please sign in to share your experience with the world.
            </p>
            <div className="inline-block p-1 rounded-2xl bg-linear-to-r from-accent-500/30 via-yellow-500/30 to-accent-500/30 group">
              <div className="bg-primary-950 rounded-xl px-10 py-4 border border-white/10 font-black text-accent-500 transition-all hover:bg-primary-900">
                Sign in to Leave Feedback
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback List */}
      <div className="space-y-10 pb-32">
        {initialFeedbacks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[2.5rem] bg-primary-900/20">
            <p className="text-primary-400 text-lg italic animate-pulse">
                Be the first to share your journey with us...
            </p>
          </div>
        ) : (
          initialFeedbacks.map((fb, idx) => (
            <div
              key={fb.id}
              className="flex flex-col sm:flex-row gap-6 p-8 bg-primary-900/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-700 hover:border-accent-500/20 transition-all group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Profile Section */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-center gap-4 text-center">
                <div className="relative w-16 h-16 rounded-3xl border-2 border-white/10 overflow-hidden bg-primary-800 shadow-2xl group-hover:scale-105 group-hover:border-accent-500/30 transition-all">
                  {fb.guests?.image ? (
                    <Image
                      src={fb.guests.image}
                      fill
                      sizes="64px"
                      className="object-cover"
                      alt={fb.guests.fullName}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-800 text-accent-500 font-black text-2xl">
                        {fb.guests?.fullName?.charAt(0) || "G"}
                    </div>
                  )}
                </div>
                <div className="sm:hidden text-left">
                    <p className="font-black text-white text-lg leading-tight group-hover:text-accent-500 transition-colors">
                        {fb.guests?.fullName}
                    </p>
                    <div className="flex items-center gap-3 text-primary-500 text-[10px] font-black uppercase tracking-widest mt-1">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(fb.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(fb.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                <div className="hidden sm:flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                  <span className="font-black text-white text-xl group-hover:text-accent-500 transition-colors">
                    {fb.guests?.fullName}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-primary-500 text-[10px] font-black uppercase tracking-[0.2em] bg-primary-800/50 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
                        <Calendar className="h-3 w-3 text-accent-500/50" />
                        {new Date(fb.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-primary-500 text-[10px] font-black uppercase tracking-[0.2em] bg-primary-800/50 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
                        <Clock className="h-3 w-3 text-accent-500/50" />
                        {new Date(fb.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <div className="relative">
                    <div className="absolute top-0 left-0 text-white/5 -mt-2 -ml-2 pointer-events-none group-hover:text-accent-500/10 transition-colors">
                        <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    </div>
                    <p className="text-primary-100 text-lg sm:text-xl leading-relaxed italic pl-6">
                        {fb.content}
                    </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
