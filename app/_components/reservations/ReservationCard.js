"use client";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import ReservationContent from "./ReservationContent";
import ReservationActions from "./ReservationActions";

export function ReservationCard({ booking }) {
  const { id, startDate, accommodations } = booking;

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleAccommodations = accommodations?.length > 1;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
      {/* <ImageCarousel
        accommodations={accommodations}
        // currentImageIndex={currentImageIndex}
        // setCurrentImageIndex={setCurrentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
      /> */}

      {/* <ReservationContent
        booking={booking}
        // currentImageIndex={currentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
      /> */}

      <ReservationActions bookingId={id} startDate={startDate} />
    </div>
  );
}

export default ReservationCard;
