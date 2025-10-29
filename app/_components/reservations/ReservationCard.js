"use client";
import { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import ReservationContent from "./ReservationContent";
import ReservationActions from "./ReservationActions";
import { formatDistance, parseISO } from "date-fns";

function ReservationCard({ booking }) {
  const { id, startDate, accommodations } = booking;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeDistance, setTimeDistance] = useState("");

  const hasMultipleAccommodations = accommodations?.length > 1;

  useEffect(() => {
    if (!startDate) return;

    const distance = formatDistance(parseISO(startDate), new Date(), {
      addSuffix: true,
    }).replace("about ", "");
    setTimeDistance(distance);
  }, [startDate]);

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
        timeDistance={timeDistance}
      />

      <ReservationActions bookingId={id} startDate={startDate} />
    </div>
  );
}

export default ReservationCard;
