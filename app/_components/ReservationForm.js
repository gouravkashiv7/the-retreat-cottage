"use client";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import { useReservation } from "./contexts/ReservationContext";
import { useFormStatus } from "react-dom";

function ReservationForm({ retreat, user }) {
  const {
    id,
    maxCapacity,
    regularPrice,
    discount: discountPercentage,
  } = retreat;

  const { range, numGuests, updateGuests, resetRange } = useReservation();
  const { pending } = useFormStatus();

  const discount = Math.round((regularPrice * discountPercentage) / 100);
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);

  const accommodationPrice = Number(numNights * (regularPrice - discount));

  const bookingData = {
    startDate,
    endDate,
    numNights,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

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
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-4 sm:px-8 lg:px-16 py-2 flex justify-between items-center">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-2 sm:gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-6 sm:h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-6 px-4 sm:py-8 sm:px-8 lg:py-10 lg:px-16 text-base sm:text-lg flex gap-4 sm:gap-5 flex-col"
      >
        <input type="hidden" name="retreatId" value={retreat.id} />
        <input
          type="hidden"
          name="accommodationPrice"
          value={accommodationPrice || ""}
        />
        {/* Display selected dates */}
        {(startDate || endDate) && (
          <div className="space-y-2">
            <label className="text-sm sm:text-base lg:text-lg">
              Selected Dates
            </label>
            <div className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base">
              {startDate && endDate
                ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                : startDate
                ? `Selecting from ${formatDate(startDate)}`
                : ""}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="numGuests"
            className="text-sm sm:text-base lg:text-lg"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
            value={numGuests}
            onChange={(e) => updateGuests(Number(e.target.value))}
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          {numGuests > 0 && (
            <p className="text-primary-300 text-sm">
              Currently selected: {numGuests}{" "}
              {numGuests === 1 ? "guest" : "guests"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="text-sm sm:text-base lg:text-lg"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm sm:text-base text-center sm:text-left">
              Start by selecting dates
            </p>
          ) : !numGuests ? (
            <p className="text-primary-300 text-sm sm:text-base text-center sm:text-left">
              Please select number of guests
            </p>
          ) : (
            <p className="text-primary-300 text-sm sm:text-base text-center sm:text-left">
              Ready to book!
            </p>
          )}

          <button
            className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-sm sm:text-base w-full sm:w-auto"
            disabled={!startDate || !endDate || !numGuests || pending}
          >
            {pending ? "Reserving " : "Reserve now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
