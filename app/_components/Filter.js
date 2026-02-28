"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useReservation } from "./contexts/ReservationContext";
import { ChevronDown } from "lucide-react";

function Filter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams?.get("capacity") ?? "all";

  const { numGuests, updateGuests } = useReservation();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update context when activeFilter changes
  useEffect(() => {
    if (activeFilter === "villa") {
      updateGuests(10);
    } else if (activeFilter === "floor") {
      updateGuests(6);
    } else if (activeFilter !== "all") {
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

  const isCustomGuest =
    activeFilter !== "all" &&
    activeFilter !== "floor" &&
    activeFilter !== "villa";

  const filterButtons = [
    {
      key: "all",
      label: "All Retreats",
      sub: "2-3 guests",
    },
    {
      key: "floor",
      label: "Book Floor",
      sub: "4-6 guests",
    },
    {
      key: "villa",
      label: "Book Villa",
      sub: "10-12 guests",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-primary-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1.5 shadow-xl">
        {/* Main Filter Buttons */}
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            className={`relative flex-1 px-4 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeFilter === btn.key
                ? "bg-accent-500 text-primary-950 shadow-lg shadow-accent-500/20"
                : "text-primary-300 hover:text-white hover:bg-white/5"
            }`}
            onClick={() => handleFilter(btn.key)}
          >
            <span className="block">{btn.label}</span>
            <span
              className={`block text-[10px] font-medium mt-0.5 ${
                activeFilter === btn.key
                  ? "text-primary-800/70"
                  : "text-primary-500"
              }`}
            >
              {btn.sub}
            </span>
          </button>
        ))}

        {/* Custom Guests Dropdown */}
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            className={`w-full px-4 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-between ${
              isCustomGuest
                ? "bg-accent-500 text-primary-950 shadow-lg shadow-accent-500/20"
                : "text-primary-300 hover:text-white hover:bg-white/5"
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>
              <span className="block text-left">Custom</span>
              <span
                className={`block text-[10px] font-medium mt-0.5 text-left ${
                  isCustomGuest ? "text-primary-800/70" : "text-primary-500"
                }`}
              >
                {isCustomGuest ? `${activeFilter} guests` : "1-10 guests"}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              } ${isCustomGuest ? "text-primary-800" : "text-primary-500"}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-primary-900/95 backdrop-blur-xl border border-white/10 rounded-xl z-20 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 p-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                      activeFilter === num.toString()
                        ? "bg-accent-500 text-primary-950 shadow-md"
                        : "text-primary-300 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => handleFilter(num.toString())}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
