"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReservation } from "../contexts/ReservationContext";
import { createPackageBooking } from "@/app/_lib/createPackage";
import { useFormStatus } from "react-dom";
import { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { updateGuestPhone } from "@/app/_lib/actions";
import { 
  Phone, 
  X, 
  Calendar, 
  Users, 
  Home, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow-2xl" onClick={onClose} />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-primary-900 border border-primary-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="h-1 bg-linear-to-r from-accent-600 via-accent-400 to-accent-600" />
        <div className="p-6 sm:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-500 hover:text-primary-300">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Contact Required</h3>
              <p className="text-primary-400 text-[10px] uppercase tracking-tighter">Coordination & Confirmation</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 text-sm font-medium">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="XXXXX XXXXX"
                className="w-full pl-12 pr-4 py-3.5 bg-primary-800 border border-primary-700 rounded-xl text-primary-100 font-medium outline-none focus:ring-2 focus:ring-accent-500 transition-all text-lg tracking-wider"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
            <button
              onClick={handleSave}
              disabled={digits.length !== 10 || saving}
              className="w-full py-4 bg-accent-500 hover:bg-accent-600 text-primary-950 font-black rounded-xl transition-all disabled:opacity-40 uppercase tracking-widest text-sm shadow-xl shadow-accent-500/10"
            >
              {saving ? "Saving..." : "Continue"}
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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md shadow-2xl" onClick={onClose} />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-primary-900 border border-primary-700 rounded-2xl shadow-3xl overflow-hidden"
      >
        <div className="h-1.5 bg-linear-to-r from-accent-600 via-accent-300 to-accent-600" />
        <div className="p-6 sm:p-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-500 hover:text-primary-300">
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Final Confirmation</h3>
          <p className="text-primary-400 text-xs mb-8 uppercase tracking-widest">Review your {details.packageName} booking</p>

          <div className="space-y-4 bg-primary-800/40 border border-primary-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">Selected Package</p>
                <p className="text-primary-100 font-bold text-lg">{details.packageName}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {details.retreats.map((r, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 bg-primary-700 border border-white/5 rounded-full text-primary-400 font-medium">#{r.id} {r.type}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-primary-700/50" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">Stay Period</p>
                <p className="text-primary-100 font-bold">{details.checkIn} — {details.checkOut}</p>
                <p className="text-accent-400/80 text-xs font-bold mt-0.5 uppercase tracking-tighter">{details.numNights} Night{details.numNights > 1 ? 's' : ''} Stay</p>
              </div>
            </div>

            <div className="h-px bg-primary-700/50" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">People</p>
                <p className="text-primary-100 font-bold">{details.numGuests} Guest{details.numGuests > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between px-2">
            <div>
              <p className="text-primary-400 text-[10px] uppercase font-bold tracking-widest mb-1">Total Stay Value</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-accent-400">₹{details.price.toLocaleString()}</span>
                <span className="text-[10px] text-primary-500 uppercase font-medium">INR</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-500/90 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3" /> Flexible Payment
              </p>
              <p className="text-primary-500 text-[10px] font-medium italic mt-0.5">Pay on Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={onClose} 
              disabled={isSubmitting}
              className="py-4 border border-primary-700 text-primary-400 hover:bg-primary-800 font-bold rounded-xl transition-all text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              disabled={isSubmitting}
              className="relative group/confirm py-4 bg-accent-500 hover:bg-accent-600 text-primary-950 font-black rounded-xl transition-all disabled:opacity-50 overflow-hidden text-sm uppercase tracking-widest shadow-xl shadow-accent-500/20"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-950/30 border-t-primary-950 rounded-full animate-spin" />
                  Booking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Confirm <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

// Separate component for the submit button
function SubmitButton({ canConfirmBooking, packageName, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full py-5 px-8 rounded-xl font-black transition-all text-lg overflow-hidden group shadow-2xl ${
        canConfirmBooking
          ? "cursor-pointer active:scale-[0.98] shadow-accent-500/10"
          : "cursor-not-allowed opacity-40 shadow-none border border-primary-800"
      }`}
      disabled={!canConfirmBooking}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          canConfirmBooking
            ? "bg-linear-to-r from-accent-600 via-accent-400 to-accent-600 bg-size-[200%_auto] group-hover:bg-size-[100%_auto]"
            : "bg-primary-800"
        }`}
      ></div>

      {/* Text layer */}
      <div
        className={`relative flex items-center justify-center gap-3 ${
          canConfirmBooking
            ? "text-primary-950"
            : "text-primary-500"
        }`}
      >
        <span>Confirm {packageName} Package Stay</span>
        <ArrowRight className={`w-5 h-5 ${canConfirmBooking ? 'group-hover:translate-x-1.5' : ''} transition-transform`} />
      </div>
    </button>
  );
}

export default function BookingFormElements({
  formattedCheckIn,
  formattedCheckOut,
  numGuests,
  updateGuests,
  guestOptionsArray,
  packageName,
  settings,
  showSpecialRequirements,
  specialRequirements,
  setSpecialRequirements,
  canConfirmBooking,
  backUrl,
  retreats = [],
  dynamicPricing,
  resetRange,
  bookingValidation,
  guest,
}) {
  const router = useRouter();
  const { range } = useReservation();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPhone, setHasPhone] = useState(!!guest?.phone);
  const formRef = useRef(null);

  // Calculate number of nights
  const calculateNights = () => {
    if (!range?.from || !range?.to) return 0;
    const startDate = new Date(range.from);
    const endDate = new Date(range.to);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const numNights = calculateNights();

  // Intercept form submission
  const handleReserveClick = (e) => {
    e?.preventDefault();
    if (!canConfirmBooking) return;

    if (!hasPhone) {
      setShowPhoneModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const onPhoneSaved = (savedPhone) => {
    setHasPhone(true);
    setShowPhoneModal(false);
    setShowConfirmModal(true);
  };

  const onConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const result = await createPackageBooking(formData);
        if (result?.redirect) {
          resetRange();
          router.push(result.redirect);
        }
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  const confirmDetails = {
    packageName,
    checkIn: formattedCheckIn,
    checkOut: formattedCheckOut,
    numNights,
    numGuests,
    price: dynamicPricing.totalPrice,
    retreats: retreats,
  };

  // Prepare retreat data for form submission
  const getRetreatData = () => {
    return retreats.map((retreat) => ({
      id: retreat.id,
      type: retreat.type,
      isFull:
        retreat.type === "cabin"
          ? numGuests >= (retreat.maxCapacity || 2)
          : undefined,
    }));
  };

  const retreatData = getRetreatData();

  // Scroll to calendar function
  const scrollToCalendar = () => {
    const calendar = document.getElementById("booking-calendar");
    if (calendar) {
      calendar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Display-Only Form Section */}
      <div className="space-y-6">
        {/* Read-only Date Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Check-in
            </label>
            {formattedCheckIn ? (
              <div className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium cursor-default">
                {formattedCheckIn}
              </div>
            ) : (
              <button
                onClick={scrollToCalendar}
                type="button"
                className="w-full p-3 border border-accent-500/40 rounded-xl bg-accent-500/10 text-accent-400 font-bold text-sm flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(236,201,140,0.1)] hover:bg-accent-500/20 transition-all active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Check-out
            </label>
            {formattedCheckOut ? (
              <div className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium cursor-default">
                {formattedCheckOut}
              </div>
            ) : (
              <button
                onClick={scrollToCalendar}
                type="button"
                className="w-full p-3 border border-accent-500/40 rounded-xl bg-accent-500/10 text-accent-400 font-bold text-sm flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(236,201,140,0.1)] hover:bg-accent-500/20 transition-all active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select
              </button>
            )}
          </div>
        </div>

        {/* Editable Guest Count */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
            Number of Guests
          </label>
          <div className="relative group/select">
            <select
              value={numGuests}
              onChange={(e) => updateGuests(parseInt(e.target.value))}
              className="w-full p-3 pr-10 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium appearance-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all cursor-pointer group-hover/select:border-accent-400/40"
            >
              {guestOptionsArray.map((option) => (
                <option key={option} value={option} className="bg-primary-900">
                  {option} {option === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent-500/60 group-hover/select:text-accent-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {(packageName.includes("First Floor") ||
            packageName.includes("Villa")) && (
            <p className="text-[10px] text-accent-400/80 mt-2 px-1 italic">
              * Extra guests beyond base capacity add ₹
              {settings.extraGuestPrice} / night
            </p>
          )}
        </div>

        {/* Special Requirements */}
        {showSpecialRequirements && (
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Special Requirements
            </label>
            <textarea
              name="observations"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="Any dietary preferences, early check-in requests, or special occasions?"
              className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all min-h-25 resize-none"
            />
          </div>
        )}
      </div>

      {/* Booking Form with Form Action Interception */}
      <form
        ref={formRef}
        onSubmit={handleReserveClick}
        className="mt-8 pt-6 border-t border-accent-400/10"
      >
        {/* Hidden Inputs for Form Data */}
        <input
          type="hidden"
          name="startDate"
          value={range?.from?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={range?.to?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="numNights"
          value={bookingValidation.nights}
        />
        <input type="hidden" name="numGuests" value={numGuests} />
        <input type="hidden" name="packageName" value={packageName} />
        <input
          type="hidden"
          name="totalPrice"
          value={dynamicPricing.totalPrice}
        />
        <input
          type="hidden"
          name="accommodationPrice"
          value={
            bookingValidation.nights > 0
              ? dynamicPricing.totalPrice / bookingValidation.nights
              : 0
          }
        />
        <input type="hidden" name="observations" value={specialRequirements} />

        {/* Retreat Data as JSON */}
        <input
          type="hidden"
          name="retreatIds"
          value={JSON.stringify(retreatData.map((retreat) => retreat.id))}
        />

        {/* Use the separate SubmitButton component */}
        <SubmitButton
          canConfirmBooking={canConfirmBooking}
          packageName={packageName}
          onClick={handleReserveClick}
        />
      </form>

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

      <div className="mt-6 text-center">
        <Link
          href={backUrl}
          className="text-primary-400 hover:text-accent-400 text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to all packages
        </Link>
      </div>
    </>
  );
}
