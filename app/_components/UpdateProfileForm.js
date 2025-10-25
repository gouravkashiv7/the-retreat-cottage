"use client";
import { useState } from "react";
import { updateGuest } from "../_lib/server";

function UpdateProfileForm({ guest, children }) {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [idType, setIdType] = useState("");

  const {
    fullName,
    email,
    country,
    nationalId,
    phone,
    idType: defaultIdType,
    countryFlag,
    passport,
  } = guest;

  const handleCountryChange = (e) => {
    const country = e.target.value.split("%")[0]; // Extract country name from value
    setSelectedCountry(country);
    if (country === "India") {
      setIdType("");
    } else {
      setIdType("passport");
    }
  };

  return (
    <form
      className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-6 md:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Full name</label>
        <input
          disabled
          defaultValue={fullName}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Email address</label>
        <input
          disabled
          defaultValue={email}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm sm:text-base">
          Phone Number
        </label>
        <input
          type="number"
          name="phone"
          defaultValue={phone}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="country" className="text-sm sm:text-base">
            Select Country
          </label>
          <img
            src={countryFlag || "https://flagcdn.com/in.svg"}
            alt="Country flag"
            className="h-4 sm:h-5 rounded-sm"
          />
        </div>
        <div onChange={handleCountryChange}>{children}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="idType" className="block text-sm sm:text-base">
          ID Type
        </label>
        <select
          name="idType"
          defaultValue={defaultIdType}
          value={idType}
          onChange={(e) => setIdType(e.target.value)}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 disabled:opacity-70"
          disabled={selectedCountry !== "India"}
        >
          <option value="">Select ID Type</option>
          {selectedCountry === "India" ? (
            <>
              <option value="aadhar">Aadhar Card</option>
              <option value="driver">Driver License</option>
              <option value="pan">PAN Card</option>
              <option value="voter">Voter Card</option>
            </>
          ) : (
            <option value="passport">Passport</option>
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="idNumber" className="block text-sm sm:text-base">
          {selectedCountry === "India"
            ? "National ID Number"
            : "Passport Number"}
        </label>
        <input
          name="idNumber"
          defaultValue={selectedCountry === "India" ? nationalId : passport}
          disabled={!idType}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
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
