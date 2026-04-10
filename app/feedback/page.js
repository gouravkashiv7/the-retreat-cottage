import BookingLayout from "../_components/booking/BookingLayout";
import FeedbackSection from "./FeedbackSection";
import { getFeedbacks } from "../_lib/feedback-actions";
import { MessageSquareText } from "lucide-react";

export const metadata = {
  title: "Guest Feedback | Your Experience Matters | The Retreat Cottage",
  description:
    "Read what our guests have to say about their stay at The Retreat Cottage. Share your own experience and help us grow.",
};

export default async function FeedbackPage() {
  const feedbacks = await getFeedbacks();

  return (
    <BookingLayout>
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-500 text-xs font-black uppercase tracking-widest">
            <MessageSquareText className="h-4 w-4" />
            Guestbook
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">
            Guest <span className="text-accent-500">Feedback</span>
          </h1>
          <p className="text-primary-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Your stories and feedback are the heart of The Retreat Cottage. 
            We'd love to hear about your stay!
          </p>
        </div>

        {/* Feedback Section (Form + List) */}
        <FeedbackSection initialFeedbacks={feedbacks} />
      </div>
    </BookingLayout>
  );
}
