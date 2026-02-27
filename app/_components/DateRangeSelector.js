"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useReservation } from "./contexts/ReservationContext";

export default function DateRangeSelector() {
  const { range, setRange, resetRange } = useReservation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sync from URL to context ONLY on initial mount if context is empty
  // We use a ref to prevent re-syncing from the URL immediately after the user clicks "Clear"
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const startParam = searchParams.get("startDate");
      const endParam = searchParams.get("endDate");

      if ((startParam || endParam) && !range?.from && !range?.to) {
        setRange({
          from: startParam ? new Date(startParam) : undefined,
          to: endParam ? new Date(endParam) : undefined,
        });
      }
      isInitialMount.current = false;
    }
  }, [searchParams, range?.from, range?.to, setRange]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    // When clearing an input, 'value' is empty string
    const newDate = value ? new Date(value) : undefined;

    // Create new params object to construct the next URL
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // First, push to router so URL updates immediately (outside of setState render cycle)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    // Then update context state
    setRange((prev) => ({
      ...prev,
      [name === "startDate" ? "from" : "to"]: newDate,
    }));
  };

  const clearDates = () => {
    // 1. Reset local React context state FIRST
    resetRange();

    // 2. Clear URL parameters
    const params = new URLSearchParams(searchParams);
    params.delete("startDate");
    params.delete("endDate");

    // 3. Push empty URL to router
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Helper to get today's date string specifically in IST (India Standard Time)
  const getTodayIST = () => {
    const now = new Date();
    // Format to IST using Intl string, then parse out the YYYY-MM-DD
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

  // Safe date formatting function
  const formatDate = (dateInput) => {
    if (!dateInput) return "";

    // Ensure we have a Date object
    const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);

    // Check if it's a valid date
    if (isNaN(dateObj.getTime())) return "";

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Convert Date objects to ISO string for input values
  const dateRange = {
    startDate: range?.from ? range?.from.toISOString().split("T")[0] : "",
    endDate: range?.to ? range?.to.toISOString().split("T")[0] : "",
  };

  // Calculate min date for end date input based on IST
  const todayIST = getTodayIST();

  const minEndDate = range?.from
    ? range?.from.toISOString().split("T")[0]
    : todayIST;

  return (
    <div className="bg-primary-900 border border-primary-800 rounded-lg p-4 sm:p-6 mb-6">
      <h3 className="text-lg sm:text-xl font-semibold text-accent-400 mb-4 text-center sm:text-left">
        Select Your Stay Dates
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
        {/* Start Date */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            min={todayIST}
            className="w-full p-3 border border-primary-700 bg-primary-800 rounded-lg text-primary-100 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          />
        </div>

        {/* End Date */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            min={minEndDate}
            className="w-full p-3 border border-primary-700 bg-primary-800 rounded-lg text-primary-100 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          />
        </div>

        {/* Clear Button */}
        {(dateRange.startDate || dateRange.endDate) && (
          <div className="flex items-end">
            <button
              onClick={clearDates}
              className="px-4 py-3 bg-accent-500 hover:bg-accent-600 text-primary-800 font-semibold rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Selected Dates Summary */}
      {(range?.from || range?.to) && (
        <div className="mt-4 p-3 bg-primary-800 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {range?.from && (
              <div>
                <span className="text-primary-300">Check-in:</span>
                <p className="text-primary-100 font-medium">
                  {formatDate(range?.from)}
                </p>
              </div>
            )}
            {range?.to && (
              <div>
                <span className="text-primary-300">Check-out:</span>
                <p className="text-primary-100 font-medium">
                  {formatDate(range?.to)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
