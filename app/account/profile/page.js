import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Profile page",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl sm:text-3xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="country"
          id="country"
          className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20 [&>option]:bg-primary-900 [&>option]:text-white"
          defaultCountry={guest.country || "India"}
        />
      </UpdateProfileForm>
    </div>
  );
}
