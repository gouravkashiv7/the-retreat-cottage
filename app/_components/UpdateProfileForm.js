"use client";
import { useEffect, useRef, useState } from "react";
import { updateGuest, extractIdDetailsAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  UploadCloud,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function UpdateProfileForm({ guest, children }) {
  const {
    fullName,
    email,
    nationalId,
    phone,
    idType: defaultIdType,
    countryFlag,
    passport,
    address,
    idFrontUrl,
    idBackUrl,
  } = guest;

  const [selectedCountry, setSelectedCountry] = useState(
    guest.country || "India",
  );
  const formRef = useRef();

  const router = useRouter();
  const [formKey, setFormKey] = useState(Date.now());
  // AI extraction states
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractMsg, setExtractMsg] = useState({ type: "", text: "" });
  const [submitMsg, setSubmitMsg] = useState({ type: "", text: "" });
  const [selectedIdType, setSelectedIdType] = useState(defaultIdType || "");
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);

  const [frontPreview, setFrontPreview] = useState(idFrontUrl || null);
  const [backPreview, setBackPreview] = useState(idBackUrl || null);
  const lastExtractedRef = useRef({ front: null, back: null });

  // Auto-trigger extract when both images are uploaded
  useEffect(() => {
    const frontFile = frontImageRef.current?.files?.[0];
    const backFile = backImageRef.current?.files?.[0];

    // Only auto-trigger if BOTH are selected and they are NEW files
    if (frontFile && backFile && !isExtracting) {
      // Check if we've already extracted this specific pair
      if (
        lastExtractedRef.current.front === frontFile.name &&
        lastExtractedRef.current.back === backFile.name
      ) {
        return;
      }

      lastExtractedRef.current = {
        front: frontFile.name,
        back: backFile.name,
      };
      handleExtract();
    }
  }, [frontPreview, backPreview, isExtracting]);

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

  // 1. Nationality Locking Logic
  useEffect(() => {
    // If not indian, lock to passport
    if (selectedCountry !== "India") {
      setSelectedIdType("passport");
    } else {
      // If it is India, keep whatever was there, or keep empty if it was changed from Foreign back to India
      if (selectedIdType === "passport" && !defaultIdType) {
        // Only reset if we transition from foreign to India and weren't originally a passport user
        // setSelectedIdType(""); 
        // Actually, we don't necessarily need to reset it, user can change it.
      }
    }
  }, [selectedCountry, defaultIdType]);

  const handleExtract = async () => {
    const frontFile = frontImageRef.current?.files?.[0];
    const backFile = backImageRef.current?.files?.[0];

    if (!frontFile && !backFile) {
      setExtractMsg({
        type: "error",
        text: "Please select at least one ID image above (Front or Back) first.",
      });
      return;
    }

    setIsExtracting(true);
    setExtractMsg({ type: "", text: "" });

    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      const imagesToProcess = [];
      if (frontFile) imagesToProcess.push(await readFileAsBase64(frontFile));
      if (backFile) imagesToProcess.push(await readFileAsBase64(backFile));

      const data = await extractIdDetailsAction(imagesToProcess);

      if (data.error) throw new Error(data.error);

      // --- Autofill Form (STRICLY LIMITED SCOPE) ---
      
      // 1. Full Name
      if (data.fullName) {
        const nameInput = formRef.current?.querySelector(
          'input[name="fullName"]',
        );
        if (nameInput) nameInput.value = data.fullName;
      }

      // 2. ID Number (National ID or Passport)
      const detectedIdNumber =
        data.idNumber ||
        data.nationalId ||
        data.passport ||
        data.passportNumber ||
        data.id_number;
        
      if (detectedIdNumber) {
        const idInput = formRef.current?.querySelector(
          'input[name="idNumber"]',
        );
        if (idInput) {
          idInput.value = detectedIdNumber;
          idInput.disabled = false;
        }
      }

      // 3. Address
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

  const handleSubmit = async (formData) => {
    setSubmitMsg({ type: "", text: "" });
    try {
      const result = await updateGuest(formData);
      if (result?.success) {
        setSubmitMsg({ type: "success", text: result.message });
        setFormKey(Date.now());
        router.refresh();
      } else {
        setSubmitMsg({
          type: "error",
          text: result?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      setSubmitMsg({
        type: "error",
        text: error.message || "Failed to update profile.",
      });
    }
  };

  return (
    <form
      key={formKey}
      ref={formRef}
      className="bg-primary-900/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-2xl sm:rounded-3xl py-8 sm:py-10 px-5 sm:px-10 flex flex-col gap-6 sm:gap-8 overflow-hidden relative"
      action={handleSubmit}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 w-full">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
            Full name (As on ID)
            <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded-full border border-accent-500/20">
              <Sparkles className="w-2.5 h-2.5" /> Supports Autofill
            </span>
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

      <div className="bg-primary-950/40 border border-primary-800/50 rounded-2xl p-6 sm:p-8 space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center border border-accent-500/20">
              <ShieldCheck className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-lg">Identity Details</h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" /> SECURE STORAGE
                </span>
              </div>
              <p className="text-primary-400 text-xs">
                Your ID documents are encrypted and stored in a private, secure vault.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label
              htmlFor="idType"
              className="block text-xs font-bold text-primary-400 uppercase tracking-wider"
            >
              Step 1: Select ID Type
            </label>
            <select
              name="idType"
              value={selectedIdType}
              disabled={selectedCountry !== "India"}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedIdType(val);
                const idNumberInput = e.target.form?.querySelector(
                  'input[name="idNumber"]',
                );
                if (idNumberInput) {
                  idNumberInput.disabled = !val;
                  if (!val) idNumberInput.value = "";
                }
              }}
              className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20 disabled:cursor-not-allowed disabled:bg-primary-800/20 disabled:text-primary-400 [&>option]:bg-primary-900 [&>option]:text-white"
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
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded-full border border-accent-500/20">
                <Sparkles className="w-2.5 h-2.5" /> Supports Autofill
              </span>
            </label>
            <input
              name="idNumber"
              disabled={!selectedIdType}
              defaultValue={
                selectedCountry === "India" ? nationalId : passport || ""
              }
              className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20 disabled:cursor-not-allowed disabled:bg-primary-800/20 disabled:text-primary-500 disabled:border-transparent"
              placeholder={
                selectedIdType
                  ? "Enter ID number..."
                  : "Select type above first"
              }
            />
          </div>
        </div>

        {selectedIdType && (
          <div className="pt-6 mt-6 border-t border-primary-800/50 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="text-white font-bold">
                  Step 2: Upload ID (For Smoother Check-in)
                </h4>
                <p className="text-primary-400 text-xs mt-1 italic">
                  Upload your ID images to automatically fill name & address.
                </p>
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
                {isExtracting ? "Scanning..." : "Smart Autofill"}
              </button>
            </div>

            {extractMsg.text && (
              <div
                className={`flex items-start gap-3 p-4 mb-6 rounded-xl text-sm ${extractMsg.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}
              >
                {extractMsg.type === "error" ? (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                )}
                <p>{extractMsg.text}</p>
              </div>
            )}

            {!selectedIdType && (
              <div className="bg-primary-900/40 border border-accent-500/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-10 h-10 text-primary-700 mb-3" />
                <h5 className="text-primary-300 font-bold mb-1">Upload Locked</h5>
                <p className="text-primary-500 text-xs">
                  Please select an ID type in Step 1 to enable image upload and Smart Fill.
                </p>
              </div>
            )}

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${!selectedIdType ? 'opacity-20 pointer-events-none' : ''}`}>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
                  Front Side
                </label>
                <div
                  className={`relative border-2 border-dashed h-48 ${frontPreview ? "border-accent-500/50" : "border-primary-700/50 hover:border-primary-500"} rounded-xl transition-colors flex flex-col items-center justify-center text-center group overflow-hidden bg-primary-900/20`}
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
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-primary-500 mb-2 group-hover:text-accent-400 transition-colors" />
                      <p className="text-xs font-medium text-primary-300">
                        Front Image
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary-400 uppercase tracking-wider">
                  Back Side
                </label>
                <div
                  className={`relative border-2 border-dashed h-48 ${backPreview ? "border-accent-500/50" : "border-primary-700/50 hover:border-primary-500"} rounded-xl transition-colors flex flex-col items-center justify-center text-center group overflow-hidden bg-primary-900/20`}
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
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-primary-500 mb-2 group-hover:text-accent-400 transition-colors" />
                      <p className="text-xs font-medium text-primary-300">
                        Back Image
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-primary-800/50">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            Address Information
            <span className="inline-flex items-center gap-1 text-[10px] text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded-full border border-accent-500/20">
              <Sparkles className="w-2.5 h-2.5" /> Supports Autofill
            </span>
          </h4>
          <div className="space-y-2 sm:col-span-2">
            <textarea
              name="address"
              defaultValue={address}
              rows={3}
              className="w-full p-4 border border-white/10 bg-primary-800/40 rounded-xl text-primary-100 font-medium focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all hover:border-white/20"
              placeholder="Full address as per your ID document..."
            />
          </div>
        </div>
      </div>

      {submitMsg.text && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl text-sm relative z-10 w-full animate-in fade-in slide-in-from-bottom-2 ${submitMsg.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}
        >
          {submitMsg.type === "error" ? (
            <AlertCircle className="w-5 h-5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          )}
          <p>{submitMsg.text}</p>
        </div>
      )}

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
