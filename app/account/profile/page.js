import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Profile page",
};

export default function Page() {
  // CHANGE
  // const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl sm:text-3xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
