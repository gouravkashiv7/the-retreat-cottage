"use client";
import { useEffect, useRef, useState } from "react";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({ guest, children }) {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const formRef = useRef();
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
  };
  useEffect(() => {
    const idTypeSelect = formRef.current?.querySelector(
      'select[name="idType"]'
    );
    const idNumberInput = formRef.current?.querySelector(
      'input[name="idNumber"]'
    );

    if (defaultIdType) return;
    if (!idTypeSelect || !idNumberInput) return;

    // Reset ID fields when country changes
    idTypeSelect.value = "";
    idNumberInput.disabled = true;
    idNumberInput.value = "";

    // Auto-set passport for non-India countries
    if (selectedCountry !== "India") {
      idTypeSelect.value = "passport";
      idNumberInput.disabled = false;
    }
  }, [selectedCountry]);

  return (
    <form
      ref={formRef}
      className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-6 md:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm sm:text-base">Email address</label>
        <input
          disabled
          name="email"
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
          onChange={(e) => {
            const idNumberInput = e.target.form?.querySelector(
              'input[name="idNumber"]'
            );
            if (idNumberInput) {
              idNumberInput.disabled = !e.target.value;
            }
          }}
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base "
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
          disabled={!defaultIdType}
          defaultValue={
            selectedCountry === "India" ? nationalId : passport || ""
          }
          className="px-4 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="flex justify-end items-center gap-4 sm:gap-6 pt-4">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-sm sm:text-base w-full sm:w-auto text-center"
    >
      {pending ? "Updating ..." : "Update Profile"}
    </button>
  );
}

export default UpdateProfileForm;
