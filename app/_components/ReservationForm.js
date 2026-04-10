"use client";

import { useState } from "react";
import { differenceInDays } from "date-fns";
import { createBooking, updateGuestPhone } from "../_lib/actions";
import { useReservation } from "@/app/_components/contexts/ReservationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/validations/booking";
import { m, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Phone, X, Calendar, Users, Home, AlertCircle, CheckCircle2 } from "lucide-react";

// ── Phone Number Modal ──
function PhoneModal({ isOpen, onClose, onSave }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const digits = phone.replace(/\D/g, "");

  const handleSave = async () => {
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await updateGuestPhone(digits);
      onSave(digits);
    } catch (err) {
      setError(err.message || "Failed to save phone number");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-primary-900 border border-primary-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600" />

        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-500 hover:text-primary-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contact Number Required</h3>
              <p className="text-primary-400 text-xs">We need your number to confirm your booking</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary-300 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 text-sm font-medium">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(val);
                    if (val.length === 10) setError("");
                  }}
                  placeholder="XXXXX XXXXX"
                  className="w-full pl-12 pr-4 py-3.5 bg-primary-800 border border-primary-700 rounded-xl text-primary-100 font-medium placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 outline-none transition-all text-lg tracking-wider"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] text-primary-500">
                  {digits.length}/10 digits
                </p>
                {digits.length === 10 && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </p>
                )}
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={digits.length !== 10 || saving}
              className="w-full py-3.5 bg-accent-500 hover:bg-accent-600 text-primary-950 font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-sm uppercase tracking-wider"
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

// ── Booking Confirmation Modal ──
function ConfirmModal({ isOpen, onClose, onConfirm, details, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-primary-900 border border-primary-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600" />

        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-500 hover:text-primary-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold text-white mb-1">Confirm Your Stay Request</h3>
          <p className="text-primary-400 text-sm mb-6">Please review the details below before confirming.</p>

          {/* Details Card */}
          <div className="space-y-4 bg-primary-800/50 border border-primary-700 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4 text-accent-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">Accommodation</p>
                <p className="text-white font-semibold">{details.typeName} {details.retreatName}</p>
              </div>
            </div>

            <div className="h-px bg-primary-700" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-accent-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">Stay Period</p>
                <p className="text-white font-semibold">{details.checkIn} → {details.checkOut}</p>
                <p className="text-primary-400 text-xs">{details.numNights} {details.numNights === 1 ? "night" : "nights"}</p>
              </div>
            </div>

            <div className="h-px bg-primary-700" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-accent-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">Guests</p>
                <p className="text-white font-semibold">{details.numGuests} {details.numGuests === 1 ? "Guest" : "Guests"}</p>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between mt-5 px-2">
            <span className="text-primary-300 text-sm font-medium">Estimated Stay Value</span>
            <span className="text-2xl font-bold text-accent-400">₹{details.price.toLocaleString()}</span>
          </div>

          <p className="text-primary-500 text-[10px] text-center mt-1 italic">Payment on arrival</p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="py-3 border border-primary-700 text-primary-300 hover:bg-primary-800 font-semibold rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="py-3 bg-accent-500 hover:bg-accent-600 text-primary-950 font-bold rounded-xl transition-all disabled:opacity-50 active:scale-[0.98] text-sm uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-950/30 border-t-primary-950 rounded-full animate-spin" />
                  Booking...
                </span>
              ) : (
                "Confirm Stay Request"
              )}
            </button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

// ── Main Reservation Form ──
function ReservationForm({ retreat, user, guest, type }) {
  const router = useRouter();
  const {
    id: retreatId,
    name: retreatName,
    maxCapacity,
    regularPrice,
    discount: discountPercentage,
  } = retreat;

  const { range, numGuests, updateGuests, resetRange } = useReservation();

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasPhone, setHasPhone] = useState(!!guest?.phone);

  const discount = Math.round((regularPrice * discountPercentage) / 100);
  const startDate = range?.from || null;
  const endDate = range?.to || null;
  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const accommodationPrice = Number(numNights * (regularPrice - discount));

  const typeName = type === "cabin" ? "Cabin" : "Room";

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

  // Intercept form submission — check phone first, then show confirmation
  const handleReserveClick = (e) => {
    e.preventDefault();

    if (!hasPhone) {
      setShowPhoneModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const onPhoneSaved = (savedPhone) => {
    setHasPhone(true);
    setShowPhoneModal(false);
    toast.success("Phone number saved!");
    // Now show confirmation modal
    setShowConfirmModal(true);
  };

  const onConfirmBooking = async () => {
    // Trigger react-hook-form validation and submit
    handleSubmit(onSubmit)();
  };

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
        setShowConfirmModal(false);
        toast.success(
          "Stay request submitted! We've sent you a confirmation email.",
        );
        resetRange();
        reset();
        router.push(result.redirect);
      }
    } catch (error) {
      setShowConfirmModal(false);
      toast.error(
        error.message || "Failed to submit request. Please try again.",
      );
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "";
  };

  const confirmDetails = {
    typeName,
    retreatName,
    checkIn: formatDate(startDate),
    checkOut: formatDate(endDate),
    numNights,
    numGuests,
    price: accommodationPrice,
  };

  return (
    <>
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
          onSubmit={handleReserveClick}
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
              className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-accent-500 hover:bg-accent-600 text-primary-950 rounded-xl transition-all disabled:opacity-50 shadow-xl shadow-accent-500/10 active:scale-[0.98]"
              disabled={!startDate || !endDate || isSubmitting}
            >
              Request Your Stay
            </button>
          </div>
        </form>
      </m.div>

      {/* Modals */}
      <AnimatePresence>
        {showPhoneModal && (
          <PhoneModal
            isOpen={showPhoneModal}
            onClose={() => setShowPhoneModal(false)}
            onSave={onPhoneSaved}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={onConfirmBooking}
            details={confirmDetails}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ReservationForm;
