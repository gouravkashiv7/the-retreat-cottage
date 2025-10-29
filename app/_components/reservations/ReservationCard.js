"use client";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import dynamic from "next/dynamic";

const DynamicReservationContent = dynamic(
  () => import("./ReservationContent"),
  { ssr: false }
);

import ReservationActions from "./ReservationActions";

export function ReservationCard({ booking }) {
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

      <DynamicReservationContent
        booking={booking}
        currentImageIndex={currentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
      />

      <ReservationActions bookingId={id} startDate={startDate} />
    </div>
  );
}

export default ReservationCard;
