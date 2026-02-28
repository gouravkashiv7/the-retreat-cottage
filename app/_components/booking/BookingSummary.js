import { getSettings, getGuest } from "@/app/_lib/data-service";
import LoginMessage from "../LoginMessage";
import BookingForm from "./BookingForm";
import { auth } from "@/app/_lib/auth";

export default async function BookingSummary(props) {
  const settings = await getSettings();
  const session = await auth();

  if (!session) {
    return <LoginMessage />;
  }

  const guest = await getGuest(session.user.email);

  return (
    <BookingForm
      {...props}
      settings={settings}
      guestId={session?.user?.guestId}
      guest={guest}
    />
  );
}
