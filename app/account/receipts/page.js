import { auth } from "@/app/_lib/auth";
import {
  getCheckedOutBookings,
  getOrdersForBooking,
} from "@/app/_lib/data-service";
import ReceiptsClient from "./ReceiptsClient";

export const metadata = {
  title: "Receipts",
};

export default async function Page() {
  const session = await auth();
  const guestId = session.user.guestId;

  const bookings = await getCheckedOutBookings(guestId);

  // Fetch orders for each booking in parallel
  const bookingsWithOrders = await Promise.all(
    bookings.map(async (booking) => {
      const orders = await getOrdersForBooking(booking.id);
      return { ...booking, orders };
    }),
  );

  return <ReceiptsClient bookings={bookingsWithOrders} />;
}
