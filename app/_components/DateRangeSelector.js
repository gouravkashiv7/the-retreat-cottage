"use client";

import { useReservation } from "./contexts/ReservationContext";

export default function DateRangeSelector() {
  const { range, setRange, resetRange } = useReservation();

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setRange((prev) => ({
      ...prev,
      [name === "startDate" ? "from" : "to"]: value || undefined,
    }));
  };

  const clearDates = () => {
    resetRange();
  };

  // Convert context format to local component format for display
  const dateRange = {
    startDate: range.from || "",
    endDate: range.to || "",
  };

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
            min={new Date().toISOString().split("T")[0]}
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
            min={dateRange.startDate || new Date().toISOString().split("T")[0]}
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
      {(dateRange.startDate || dateRange.endDate) && (
        <div className="mt-4 p-3 bg-primary-800 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {dateRange.startDate && (
              <div>
                <span className="text-primary-300">Check-in:</span>
                <p className="text-primary-100 font-medium">
                  {new Date(dateRange.startDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {dateRange.endDate && (
              <div>
                <span className="text-primary-300">Check-out:</span>
                <p className="text-primary-100 font-medium">
                  {new Date(dateRange.endDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
