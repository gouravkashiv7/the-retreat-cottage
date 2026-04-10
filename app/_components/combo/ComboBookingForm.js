"use client";

import { useRouter } from "next/navigation";
import { createCombo } from "@/app/_lib/createCombo";
import SubmitButton from "./SubmitButton";
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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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
          
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Confirm Your Request</h3>
          <p className="text-primary-400 text-xs mb-8 uppercase tracking-widest">Review your combination booking</p>

          <div className="space-y-4 bg-primary-800/40 border border-primary-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">Combination Layout</p>
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
                <span className="text-[10px] text-primary-500 uppercase font-bold">INR</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-500/90 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3" /> Stay Request Validated
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
                  Submitting Request...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Request Stay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export default function BookingForm({
  comboId,
  formattedCheckIn,
  formattedCheckOut,
  numNights,
  guestCount,
  retreatCount,
  totalPriceForStay,
  specialRequirements,
  comboData,
  extraGuestPrice,
  canConfirmBooking,
  resetRange,
  guest,
  retreats,
}) {
  const router = useRouter();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPhone, setHasPhone] = useState(!!guest?.phone);
  const formRef = useRef(null);

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
        const result = await createCombo(formData);
        if (result?.redirect) {
          resetRange?.();
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
    checkIn: formattedCheckIn,
    checkOut: formattedCheckOut,
    numNights,
    numGuests: guestCount,
    price: totalPriceForStay,
    retreats: retreats,
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleReserveClick}>
        {/* Hidden Inputs for Form Data */}
        <input type="hidden" name="startDate" value={formattedCheckIn} />
        <input type="hidden" name="endDate" value={formattedCheckOut} />
        <input type="hidden" name="numNights" value={numNights} />
        <input type="hidden" name="numGuests" value={guestCount} />
        <input type="hidden" name="comboId" value={comboId} />
        <input type="hidden" name="totalPrice" value={totalPriceForStay} />
        <input type="hidden" name="observations" value={specialRequirements} />
        <input
          type="hidden"
          name="bookedRetreats"
          value={JSON.stringify(comboData)}
        />
        <input type="hidden" name="extraGuestPrice" value={extraGuestPrice} />

        <SubmitButton
          canConfirmBooking={canConfirmBooking}
          guestCount={guestCount}
          retreatCount={retreatCount}
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
    </>
  );
}
