function UpdateProfileForm({ children }) {
  return (
    <form className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-6 md:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col">
      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Full name</label>
        <input
          disabled
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Email address</label>
        <input
          disabled
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="text-sm sm:text-base">
            Where are you from?
          </label>
          <img
            src="https://flagcdn.com/pt.svg"
            alt="Country flag"
            className="h-4 sm:h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className="block text-sm sm:text-base">
          National ID number
        </label>
        <input
          name="nationalID"
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
        />
      </div>

      <div className="flex justify-end items-center gap-4 sm:gap-6 pt-4">
        <button className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-sm sm:text-base w-full sm:w-auto text-center">
          Update profile
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
