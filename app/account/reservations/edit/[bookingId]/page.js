import { getBooking, getSettings } from "@/app/_lib/data-service";
import EditReservationForm from "./EditReservationForm";

export default async function Page({ params }) {
  const { bookingId } = await params;

  try {
    const booking = await getBooking(bookingId);
    const { breakfastPrice } = await getSettings();

    if (!booking) {
      return (
        <div className="text-center py-8">
          <h2 className="text-2xl text-accent-400 mb-4">Booking Not Found</h2>
          <p className="text-primary-300">
            The reservation could not be loaded.
          </p>
        </div>
      );
    }

    // Prepare initial data for the client component
    const initialData = {
      numGuests: booking.numGuests,
      observations: booking.observations,
      hasBreakfast: booking.hasBreakfast,
      totalPrice: booking.totalPrice,
      accommodationPrice: booking.accommodationPrice,
      extrasPrice: booking.extrasPrice,
      status: booking.status,
      breakfastPrice,
    };

    return (
      <EditReservationForm bookingId={bookingId} initialData={initialData} />
    );
  } catch (error) {
    console.error("Error loading booking:", error);
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl text-accent-400 mb-4">Booking Not Found</h2>
        <p className="text-primary-300">
          The reservation could not be loaded. Please check the ID.
        </p>
      </div>
    );
  }
}
