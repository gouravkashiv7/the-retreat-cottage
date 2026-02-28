import { auth } from "@/app/_lib/auth";
import {
  getMenu,
  getCheckedInBooking,
  getGuestOrders,
} from "@/app/_lib/data-service";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Food Menu",
};

export default async function Page() {
  const session = await auth();
  const guestId = session.user.guestId;

  const [menuItems, checkedInBooking, recentOrders] = await Promise.all([
    getMenu(),
    getCheckedInBooking(guestId),
    getGuestOrders(guestId),
  ]);

  return (
    <MenuClient
      menuItems={menuItems || []}
      checkedInBooking={checkedInBooking}
      recentOrders={recentOrders}
    />
  );
}
