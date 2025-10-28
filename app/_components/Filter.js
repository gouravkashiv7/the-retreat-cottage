"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useReservation } from "./contexts/ReservationContext";

function Filter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams?.get("capacity") ?? "all";

  const { numGuests, updateGuests } = useReservation();

  // Update context when activeFilter changes
  useEffect(() => {
    if (activeFilter === "villa") {
      updateGuests(10);
    } else if (activeFilter === "floor") {
      updateGuests(6);
    } else if (activeFilter !== "all") {
      // It's a custom guest number, update the context
      const guestCount = parseInt(activeFilter);
      if (!isNaN(guestCount) && guestCount >= 1 && guestCount <= 10) {
        updateGuests(guestCount);
      }
    } else if (activeFilter === "all") {
      updateGuests(2);
    }
  }, [activeFilter, updateGuests]);

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsDropdownOpen(false);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  // Check if activeFilter is a custom guest number (1-10)
  const isCustomGuest =
    activeFilter !== "all" &&
    activeFilter !== "floor" &&
    activeFilter !== "villa";

  return (
    <div className="border border-primary-800 flex flex-col sm:flex-row">
      {/* All Retreats Button */}
      <button
        className={`px-4 py-3 sm:px-5 sm:py-2 hover:bg-primary-700 text-sm sm:text-base ${
          activeFilter === "all" ? `text-primary-50 bg-primary-700` : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All Retreats
        <span className="block sm:inline text-xs sm:text-sm opacity-75 mt-1 sm:mt-0 sm:ml-1">
          (2-3 guests)
        </span>
      </button>

      {/* Book Floor Button */}
      <button
        className={`px-4 py-3 sm:px-5 sm:py-2 hover:bg-primary-700 text-sm sm:text-base border-t sm:border-t-0 sm:border-l border-primary-800 ${
          activeFilter === "floor" ? `text-primary-50 bg-primary-700` : ""
        }`}
        onClick={() => handleFilter("floor")}
      >
        Book Floor
        <span className="block sm:inline text-xs sm:text-sm opacity-75 mt-1 sm:mt-0 sm:ml-1">
          (4-6 guests)
        </span>
      </button>

      {/* Custom Guests Dropdown */}
      <div className="relative border-t sm:border-t-0 sm:border-l border-primary-800">
        <button
          className={`px-4 py-3 sm:px-5 sm:py-2 hover:bg-primary-700 flex items-center justify-between w-full sm:w-auto text-sm sm:text-base ${
            isCustomGuest ? `text-primary-50 bg-primary-700` : ""
          }`}
          onClick={toggleDropdown}
        >
          <span>
            Custom Guests
            <span className="block sm:inline text-xs sm:text-sm opacity-75 mt-1 sm:mt-0 sm:ml-1">
              {isCustomGuest ? `(${activeFilter} guests)` : "(1-10)"}
            </span>
          </span>
          <span className="ml-2 transform transition-transform">
            {isDropdownOpen ? "▲" : "▼"}
          </span>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 bg-primary-900 border border-primary-800 z-10 w-full sm:w-64">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-2 max-h-60 sm:max-h-none overflow-y-auto">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`px-3 py-2 hover:bg-primary-700 text-xs sm:text-sm ${
                    activeFilter === num.toString()
                      ? `text-primary-50 bg-primary-700`
                      : ""
                  }`}
                  onClick={() => handleFilter(num.toString())}
                >
                  {num} {num === 1 ? "guest" : "guests"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Book Villa Button */}
      <button
        className={`px-4 py-3 sm:px-5 sm:py-2 hover:bg-primary-700 text-sm sm:text-base border-t sm:border-t-0 sm:border-l border-primary-800 ${
          activeFilter === "villa" ? `text-primary-50 bg-primary-700` : ""
        }`}
        onClick={() => handleFilter("villa")}
      >
        Book Villa
        <span className="block sm:inline text-xs sm:text-sm opacity-75 mt-1 sm:mt-0 sm:ml-1">
          (10-12 guests)
        </span>
      </button>
    </div>
  );
}

export default Filter;
