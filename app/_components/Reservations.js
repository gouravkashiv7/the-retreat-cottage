import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";
import { getBookedDatesById } from "../_lib/dates";

async function Reservations({ retreat, type }) {
  const { name, id } = retreat;

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesById(id, type),
  ]);
  const session = await auth();

  return (
    <div className="mb-12 lg:mb-24">
      <h2 className="text-xl sm:text-2xl lg:text-5xl font-semibold text-center text-accent-400 mb-6 lg:mb-8 px-2">
        Reserve {type.charAt(0).toUpperCase() + type.slice(1)} {name} today. Pay
        on arrival.
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 border border-primary-800 min-h-[300px] sm:min-h-[400px]">
        <div className="lg:col-span-3">
          <DateSelector
            settings={settings}
            retreat={retreat}
            bookedDates={bookedDates}
            type={type}
            guestId={session?.user?.guestId || null}
          />
        </div>
        <div className="lg:col-span-2 lg:border-l lg:border-primary-800">
          {session?.user ? (
            <ReservationForm retreat={retreat} user={session.user} />
          ) : (
            <LoginMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservations;
