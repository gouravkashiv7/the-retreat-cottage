import BookingLayout from "../_components/booking/BookingLayout";

export const metadata = {
  title: "Refund & Cancellation Policy",
};

export default function Page() {
  return (
    <BookingLayout>
      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8">
        <div className="bg-primary-900/40 backdrop-blur-md border border-accent-400/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-bl-full -mr-16 -mt-16"></div>

          <h1 className="text-4xl sm:text-5xl font-black text-gold-300 mb-8 tracking-tight bg-gradient-to-r from-gold-400 to-yellow-200 bg-clip-text text-transparent">
            Refund & Cancellation Policy
          </h1>

          <div className="space-y-10 text-primary-100 leading-relaxed">
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <h2 className="text-2xl font-bold text-accent-400 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 text-sm italic font-serif">
                  1
                </span>
                Standard Cancellation Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-primary-800/30 rounded-2xl border border-accent-400/10 hover:border-accent-400/30 transition-colors">
                  <p className="text-sm uppercase tracking-widest text-primary-400 font-bold mb-2">
                    More than 14 Days
                  </p>
                  <p className="text-3xl font-black text-green-400">100%</p>
                  <p className="text-xs text-primary-300 mt-2">
                    Full refund of the booking amount
                  </p>
                </div>
                <div className="p-6 bg-primary-800/30 rounded-2xl border border-accent-400/10 hover:border-accent-400/30 transition-colors">
                  <p className="text-sm uppercase tracking-widest text-primary-400 font-bold mb-2">
                    7 - 14 Days
                  </p>
                  <p className="text-3xl font-black text-accent-400">70%</p>
                  <p className="text-xs text-primary-300 mt-2">
                    Refund of the total booking amount
                  </p>
                </div>
                <div className="p-6 bg-primary-800/30 rounded-2xl border border-accent-400/10 hover:border-accent-400/30 transition-colors">
                  <p className="text-sm uppercase tracking-widest text-primary-400 font-bold mb-2">
                    Less than 7 Days
                  </p>
                  <p className="text-3xl font-black text-red-400">0%</p>
                  <p className="text-xs text-primary-300 mt-2">
                    Strictly non-refundable
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-2xl font-bold text-accent-400 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 text-sm italic font-serif">
                  2
                </span>
                Booking Modifications
              </h2>
              <p className="mb-4">
                Changes to reservation dates are subject to availability and may
                incur additional charges if there is a price difference for the
                new dates. Modifying a booking within 7 days of arrival is
                treated as a cancellation and new booking.
              </p>
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <h2 className="text-2xl font-bold text-accent-400 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 text-sm italic font-serif">
                  3
                </span>
                Advance Payments
              </h2>
              <p>
                To confirm your booking, an advance payment of at least 50% is
                required. Until this payment is received and verified, the
                booking status will remain "Unconfirmed" and the dates may be
                opened for other guests.
              </p>
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <h2 className="text-2xl font-bold text-accent-400 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 text-sm italic font-serif">
                  4
                </span>
                No-Show Policy
              </h2>
              <p>
                Failure to arrive at the retreat on the scheduled check-in date
                will be treated as a no-show. The entire booking amount will be
                forfeited, and the remaining nights of the stay will be
                cancelled for re-listing.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-accent-400/10">
            <p className="text-primary-400 text-sm italic opacity-70">
              * The Retreat Cottage reserves the right to modify these terms at
              any time. All refunds are processed back to the original payment
              method within 7-10 business days.
            </p>
          </div>
        </div>
      </div>
    </BookingLayout>
  );
}
