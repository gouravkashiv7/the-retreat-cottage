"use client";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    accommodations,
  } = booking;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === accommodations.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? accommodations.length - 1 : prev - 1
    );
  };

  const currentAccommodation = accommodations?.[currentImageIndex];
  const hasMultipleAccommodations = accommodations?.length > 1;

  // Generate accommodation names list
  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  // Capitalize first letter of type
  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <div className="flex flex-col md:flex-row border border-primary-800 ">
      {/* Image Carousel Section */}
      <div className="relative h-48 md:aspect-square md:w-48 flex-shrink-0 ">
        {accommodations?.length > 0 ? (
          <>
            <Image
              src={currentAccommodation?.image}
              fill
              alt={`${capitalizeFirst(currentAccommodation?.type)} ${
                currentAccommodation?.name
              }`}
              className="object-cover md:border-r border-b md:border-b-0 border-primary-800"
            />

            {/* Carousel Navigation */}
            {hasMultipleAccommodations && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {accommodations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1}/{accommodations.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-primary-900 flex items-center justify-center md:border-r border-b md:border-b-0 border-primary-800">
            <span className="text-primary-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-grow px-4 md:px-6 py-3 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              {numNights} nights in{" "}
              {hasMultipleAccommodations ? (
                <>{accommodations?.length} Retreats</>
              ) : (
                <>
                  {capitalizeFirst(currentAccommodation?.type)}{" "}
                  <span className="text-primary-300">
                    "{currentAccommodation?.name}"
                  </span>
                </>
              )}
            </h3>
            <p className="text-primary-300 mt-1 text-sm md:text-base">
              {accommodationNames}
            </p>
          </div>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              upcoming
            </span>
          )}
        </div>

        <p className="text-base md:text-lg text-primary-300 mt-2">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Accommodation Details */}
        {hasMultipleAccommodations && (
          <div className="mt-2">
            <p className="text-sm text-primary-400">
              Currently viewing:{" "}
              <span className="text-primary-200">
                {currentAccommodation?.name}
              </span>{" "}
              ({capitalizeFirst(currentAccommodation?.type)})
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-auto items-baseline pt-3">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300 hidden sm:block">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-sm text-primary-400 sm:ml-auto mt-2 sm:mt-0">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      {!isPast(startDate) ? (
        <>
          <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-primary-800 w-full md:w-[100px]">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 flex-grow px-3 py-3 md:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ReservationCard;
