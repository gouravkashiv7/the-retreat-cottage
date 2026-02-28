"use client";
import { useEffect, useRef, useState } from "react";
import { updateGuest, extractIdDetailsAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import {
  Sparkles,
  UploadCloud,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function UpdateProfileForm({ guest, children }) {
  const [selectedCountry, setSelectedCountry] = useState(
    guest.country || "India",
  );
  const formRef = useRef();

  // AI extraction states
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractMsg, setExtractMsg] = useState({ type: "", text: "" });
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);

  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const {
    fullName,
    email,
    nationalId,
    phone,
    idType: defaultIdType,
    countryFlag,
    passport,
    address,
  } = guest;

  const handleCountryChange = (e) => {
    const country = e.target.value.split("%")[0];
    setSelectedCountry(country);
  };

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    const idTypeSelect = formRef.current?.querySelector(
      'select[name="idType"]',
    );
    const idNumberInput = formRef.current?.querySelector(
      'input[name="idNumber"]',
    );

    if (defaultIdType) return;
    if (!idTypeSelect || !idNumberInput) return;

    idTypeSelect.value = "";
    idNumberInput.disabled = true;
    idNumberInput.value = "";

    if (selectedCountry !== "India") {
      idTypeSelect.value = "passport";
      idNumberInput.disabled = false;
    }
  }, [selectedCountry, defaultIdType]);

  const handleExtract = async () => {
    const file = frontImageRef.current?.files?.[0];
    if (!file) {
      setExtractMsg({
        type: "error",
        text: "Please browse and select a Front ID image below first.",
      });
      return;
    }

    setIsExtracting(true);
    setExtractMsg({ type: "", text: "" });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result;
          const data = await extractIdDetailsAction(base64);

          if (data.error) throw new Error(data.error);

          // Autofill form
          if (data.idType) {
            const typeSelect = formRef.current?.querySelector(
              'select[name="idType"]',
            );
            if (typeSelect) {
              let mappedType = "other";
              const dt = data.idType.toLowerCase();
              if (dt.includes("aadhar") || dt.includes("national"))
                mappedType = "aadhar";
              else if (dt.includes("driver") || dt.includes("driving"))
                mappedType = "driver";
              else if (dt.includes("pan")) mappedType = "pan";
              else if (dt.includes("voter") || dt.includes("voting"))
                mappedType = "voter";
              else if (dt.includes("passport")) mappedType = "passport";

              typeSelect.value = mappedType;
            }
          }

          if (data.nationalId) {
            const idInput = formRef.current?.querySelector(
              'input[name="idNumber"]',
            );
            if (idInput) {
              idInput.value = data.nationalId;
              idInput.disabled = false;
            }
          }

          if (data.fullName) {
            const nameInput = formRef.current?.querySelector(
              'input[name="fullName"]',
            );
            if (nameInput) nameInput.value = data.fullName;
          }

          if (data.address) {
            const addressInput = formRef.current?.querySelector(
              'textarea[name="address"]',
            );
            if (addressInput) addressInput.value = data.address;
          }

          setExtractMsg({
            type: "success",
            text: "ID details extracted successfully! Please verify them.",
          });
        } catch (error) {
          setExtractMsg({
            type: "error",
            text: error.message || "Failed to read ID.",
          });
        } finally {
          setIsExtracting(false);
        }
      };
    } catch (err) {
      setIsExtracting(false);
      setExtractMsg({
        type: "error",
        text: "Error processing the image file.",
      });
    }
  };

  return (
    <form
      ref={formRef}
      className="bg-primary-900/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-2xl sm:rounded-3xl py-8 sm:py-10 px-5 sm:px-10 flex flex-col gap-6 sm:gap-8 overflow-hidden relative"
      action={updateGuest}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 w-full">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
            Full name (As on ID)
          </label>
          <input
            readOnly
            name="fullName"
            defaultValue={fullName}
            className="w-full p-4 border border-white/10 bg-primary-800/20 rounded-xl text-primary-200 font-medium cursor-not-allowed transition-all focus:outline-hidden"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
            Email address
          </label>
          <input
            disabled
            name="email"
            defaultValue={email}
            className="w-full p-4 border border-white/10 bg-primary-800/20 rounded-xl text-primary-400 font-medium disabled:cursor-not-allowed transition-all"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-xs font-bold text-primary-400 uppercase tracking-wider"
          >
            Phone Number
          </label>
          <input
            type="number"
            name="phone"
            defaultValue={phone}
            className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="country"
              className="text-xs font-bold text-primary-400 uppercase tracking-wider"
            >
              Select Country
            </label>
            <img
              src={countryFlag || "https://flagcdn.com/in.svg"}
              alt="Country flag"
              className="h-5 rounded-sm shadow-sm opacity-80"
            />
          </div>
          <div onChange={handleCountryChange}>{children}</div>
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-primary-700/50 to-transparent my-2" />

      {/* ID Upload & Extraction Section */}
      <div className="bg-primary-950/40 border border-primary-800/50 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary-800/50 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center border border-accent-500/20">
              <ShieldCheck className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Verify Identity</h3>
              <p className="text-primary-400 text-xs">
                Upload your ID front and back
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExtract}
            disabled={isExtracting}
            className={`flex items-center gap-2 bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 border border-accent-500/30 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isExtracting ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg shadow-accent-500/10"}`}
          >
            {isExtracting ? (
              <div className="w-4 h-4 border-2 border-accent-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isExtracting ? "Scanning ID..." : "Smart Autofill from ID"}
          </button>
        </div>

        {extractMsg.text && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl text-sm ${extractMsg.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}
          >
            {extractMsg.type === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <p>{extractMsg.text}</p>
          </div>
        )}

        {/* Upload grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
              ID Front Image
            </label>
            <div
              className={`relative border-2 border-dashed ${frontPreview ? "border-accent-500/50" : "border-primary-700/50 hover:border-primary-500"} rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center group overflow-hidden bg-primary-900/20`}
            >
              <input
                type="file"
                name="idFrontImage"
                ref={frontImageRef}
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFrontPreview)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              {frontPreview ? (
                <div className="absolute inset-0 z-10">
                  <img
                    src={frontPreview}
                    alt="Front ID Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-primary-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-sm">
                      Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-primary-500 mb-3 group-hover:text-accent-400 transition-colors" />
                  <p className="text-sm font-medium text-primary-300">
                    Browse or drag Front ID
                  </p>
                  <p className="text-xs text-primary-500 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
              ID Back Image
            </label>
            <div
              className={`relative border-2 border-dashed ${backPreview ? "border-accent-500/50" : "border-primary-700/50 hover:border-primary-500"} rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center group overflow-hidden bg-primary-900/20`}
            >
              <input
                type="file"
                name="idBackImage"
                ref={backImageRef}
                accept="image/*"
                onChange={(e) => handleImageChange(e, setBackPreview)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              {backPreview ? (
                <div className="absolute inset-0 z-10">
                  <img
                    src={backPreview}
                    alt="Back ID Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-primary-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-sm">
                      Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-primary-500 mb-3 group-hover:text-accent-400 transition-colors" />
                  <p className="text-sm font-medium text-primary-300">
                    Browse or drag Back ID
                  </p>
                  <p className="text-xs text-primary-500 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Extracted/Manual Form fields */}
        <div className="pt-4 border-t border-primary-800/50">
          <h4 className="text-white font-bold text-lg mb-4">
            Autofilled Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="idType"
                className="block text-xs font-bold text-primary-400 uppercase tracking-wider"
              >
                ID Type
              </label>
              <select
                name="idType"
                defaultValue={defaultIdType || ""}
                onChange={(e) => {
                  const idNumberInput = e.target.form?.querySelector(
                    'input[name="idNumber"]',
                  );
                  if (idNumberInput) {
                    idNumberInput.disabled = !e.target.value;
                  }
                }}
                className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20"
              >
                <option value="">Select ID Type</option>
                {selectedCountry === "India" ? (
                  <>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="driver">Driver License</option>
                    <option value="pan">PAN Card</option>
                    <option value="voter">Voter Card</option>
                    <option value="passport">Passport</option>
                    <option value="other">Other Government ID</option>
                  </>
                ) : (
                  <>
                    <option value="passport">Passport</option>
                    <option value="other">Other Government ID</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="idNumber"
                className="block text-xs font-bold text-primary-400 uppercase tracking-wider"
              >
                {selectedCountry === "India"
                  ? "National ID Number"
                  : "Passport/ID Number"}
              </label>
              <input
                name="idNumber"
                disabled={!defaultIdType}
                defaultValue={
                  selectedCountry === "India" ? nationalId : passport || ""
                }
                className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20 disabled:cursor-not-allowed disabled:bg-primary-800/20 disabled:text-primary-500 disabled:border-transparent"
                placeholder="Enter details..."
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
                Address
              </label>
              <textarea
                name="address"
                defaultValue={address}
                rows={2}
                className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20"
                placeholder="Address extracted from ID or entered manually"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 relative z-10 w-full">
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
      className="bg-accent-500 hover:bg-accent-400 text-primary-950 px-8 py-4 rounded-xl font-black transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 text-sm sm:text-base w-full sm:w-auto text-center flex items-center justify-center"
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-primary-950 border-t-transparent rounded-full animate-spin mr-3" />
          Updating Profile...
        </>
      ) : (
        "Save Profile details →"
      )}
    </button>
  );
}

export default UpdateProfileForm;
