"use client";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import dynamic from "next/dynamic";
import ReservationActions from "./ReservationActions";
import { formatDistance, parseISO } from "date-fns";
// Dynamically import ReservationContent to avoid SSR
const ReservationContent = dynamic(() => import("./ReservationContent"), {
  ssr: false,
  loading: () => (
    <div className="flex-grow px-4 md:px-6 py-3 flex flex-col">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  ),
});

function ReservationCard({ booking }) {
  const { id, startDate, accommodations } = booking;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleAccommodations = accommodations?.length > 1;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
      <ImageCarousel
        accommodations={accommodations}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
      />

      <ReservationContent
        booking={booking}
        currentImageIndex={currentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
      />

      <ReservationActions bookingId={id} startDate={startDate} />
    </div>
  );
}

export default ReservationCard;

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
