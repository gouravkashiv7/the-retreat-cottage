"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useReservation } from "@/app/_components/contexts/ReservationContext";
import { CalendarDays, X } from "lucide-react";

export default function DateRangeSelector() {
  const { range, setRange, resetRange, updateGuests } = useReservation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const startParam = searchParams.get("startDate");
      const endParam = searchParams.get("endDate");
      const guestsParam = searchParams.get("guests");

      if (startParam || endParam) {
        setRange({
          from: startParam ? new Date(startParam) : undefined,
          to: endParam ? new Date(endParam) : undefined,
        });
      }

      if (guestsParam) {
        const count = parseInt(guestsParam);
        if (!isNaN(count)) updateGuests(count);
      }
      isInitialMount.current = false;
    }
  }, [searchParams, setRange, updateGuests]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDate = value ? new Date(value) : undefined;

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    setRange((prev) => ({
      ...prev,
      [name === "startDate" ? "from" : "to"]: newDate,
    }));
  };

  const clearDates = () => {
    resetRange();

    const params = new URLSearchParams(searchParams);
    params.delete("startDate");
    params.delete("endDate");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getTodayIST = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formatter.formatToParts(now);
    const day = parts.find((p) => p.type === "day").value;
    const month = parts.find((p) => p.type === "month").value;
    const year = parts.find((p) => p.type === "year").value;
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return "";
    const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const dateRange = {
    startDate: range?.from ? range?.from.toISOString().split("T")[0] : "",
    endDate: range?.to ? range?.to.toISOString().split("T")[0] : "",
  };

  const todayIST = getTodayIST();

  const minEndDate = range?.from
    ? range?.from.toISOString().split("T")[0]
    : todayIST;

  const hasDates = dateRange.startDate || dateRange.endDate;

  return (
    <div className="relative bg-primary-900/60 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-accent-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Select Your Stay Dates
            </h3>
            <p className="text-primary-400 text-xs font-medium">
              Filter available retreats by your travel dates
            </p>
          </div>
        </div>

        {hasDates && (
          <button
            onClick={clearDates}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl text-primary-300 hover:text-red-400 text-sm font-bold transition-all duration-300"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
            Check-in
          </label>
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            min={todayIST}
            className="w-full p-3.5 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all duration-300 hover:border-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
            Check-out
          </label>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            min={minEndDate}
            className="w-full p-3.5 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all duration-300 hover:border-white/20"
          />
        </div>
      </div>

      {/* Selected Dates Summary */}
      {hasDates && (
        <div className="mt-5 p-4 bg-accent-500/5 border border-accent-500/10 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {range?.from && (
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <div>
                  <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">
                    Check-in
                  </span>
                  <p className="text-white font-bold">
                    {formatDate(range?.from)}
                  </p>
                </div>
              </div>
            )}
            {range?.to && (
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
                <div>
                  <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">
                    Check-out
                  </span>
                  <p className="text-white font-bold">
                    {formatDate(range?.to)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
