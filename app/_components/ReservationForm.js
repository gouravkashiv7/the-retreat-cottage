"use client";

import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import { useReservation } from "./contexts/ReservationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/validations/booking";
import { m, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ReservationForm({ retreat, user }) {
  const router = useRouter();
  const {
    id: retreatId,
    maxCapacity,
    regularPrice,
    discount: discountPercentage,
  } = retreat;

  const { range, numGuests, updateGuests, resetRange } = useReservation();

  const discount = Math.round((regularPrice * discountPercentage) / 100);
  const startDate = range?.from || null;
  const endDate = range?.to || null;
  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const accommodationPrice = Number(numNights * (regularPrice - discount));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      retreatId: String(retreatId),
      numGuests: numGuests || 1,
      observations: "",
      startDate: startDate,
      endDate: endDate,
    },
    // We update values when range or numGuests changes in context
    values: {
      retreatId: String(retreatId),
      numGuests: numGuests,
      startDate: startDate,
      endDate: endDate,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("accommodationPrice", accommodationPrice);

      const result = await createBooking(
        { startDate: data.startDate, endDate: data.endDate, numNights },
        formData,
      );

      if (result?.redirect) {
        toast.success(
          "Reservation successful! We've sent you a confirmation email.",
        );
        resetRange();
        reset();
        router.push(result.redirect);
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to create reservation. Please try again.",
      );
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "";
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-primary-800 bg-primary-900 shadow-2xl"
    >
      <div className="bg-primary-800 text-primary-300 px-6 py-3 flex justify-between items-center border-b border-primary-700">
        <p className="text-sm font-medium">Logged in as</p>
        <div className="flex gap-3 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-7 w-7 rounded-full ring-2 ring-accent-500/20"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm font-semibold text-primary-100">{user.name}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-10 px-6 sm:px-12 flex flex-col gap-8"
      >
        <AnimatePresence mode="wait">
          {(startDate || endDate) && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3"
            >
              <label className="text-sm font-semibold text-primary-200 uppercase tracking-wider">
                Travel Dates
              </label>
              <div className="px-5 py-4 bg-primary-800/50 border border-primary-700 text-primary-100 w-full rounded-lg flex items-center justify-between">
                <span className="font-medium text-lg">
                  {startDate && endDate
                    ? `${formatDate(startDate)} → ${formatDate(endDate)}`
                    : startDate
                      ? `Selecting from ${formatDate(startDate)}...`
                      : ""}
                </span>
                {numNights > 0 && (
                  <span className="bg-accent-500/10 text-accent-400 px-3 py-1 rounded-full text-sm font-bold border border-accent-500/20">
                    {numNights} {numNights === 1 ? "night" : "nights"}
                  </span>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label
              htmlFor="numGuests"
              className="text-sm font-semibold text-primary-200 uppercase tracking-wider"
            >
              How many guests?
            </label>
            <select
              {...register("numGuests", { valueAsNumber: true })}
              id="numGuests"
              className="w-full px-5 py-3.5 bg-primary-800 border border-primary-700 text-primary-100 rounded-lg focus:ring-2 focus:ring-accent-500/50 outline-none transition-all appearance-none cursor-pointer"
              onChange={(e) => updateGuests(Number(e.target.value))}
            >
              <option value="">Select guests...</option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            {errors.numGuests && (
              <p className="text-red-400 text-sm mt-1">
                {errors.numGuests.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label
              htmlFor="observations"
              className="text-sm font-semibold text-primary-200 uppercase tracking-wider"
            >
              Special Requests
            </label>
            <textarea
              {...register("observations")}
              id="observations"
              className="w-full px-5 py-3 bg-primary-800 border border-primary-700 text-primary-100 rounded-lg focus:ring-2 focus:ring-accent-500/50 outline-none transition-all min-h-13.5 overflow-hidden"
              placeholder="Allergies, pets, etc."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-primary-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            {!(startDate && endDate) ? (
              <p className="text-primary-400 font-medium italic">
                Choose your dates on the calendar to begin
              </p>
            ) : (
              <div className="space-y-1">
                <p className="text-primary-300 text-sm">Total Estimate</p>
                <p className="text-3xl font-bold text-accent-400">
                  ₹{accommodationPrice.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-accent-500 hover:bg-accent-600 text-primary-950 rounded-xl transition-all disabled:opacity-50 shadow-xl shadow-accent-500/10"
            disabled={!startDate || !endDate || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Reserve Your Stay"}
          </button>
        </div>
      </form>
    </m.div>
  );
}

export default ReservationForm;
