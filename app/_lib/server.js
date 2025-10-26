"use server";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged In!!");

  const [country, countryFlag] = formData.get("country").split("%");
  const idType = formData.get("idType");
  const idNumber = formData.get("idNumber");
  const phone = formData.get("phone");

  const isValidPhone = /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\D/g, ""));
  if (!isValidPhone) throw new Error("Invalid phone number format");
  // Validate ID based on country and type
  if (country === "India") {
    if (!idType) {
      throw new Error("Please select an ID type for India");
    }

    if (!idNumber) {
      throw new Error("Please enter your ID number");
    }

    // Validate ID based on type
    const isValid = validateIndianId(idType, idNumber);
    if (!isValid) {
      throw new Error(`Invalid ${getIndianIdTypeName(idType)} number`);
    }
  } else {
    // For non-India countries, validate passport
    if (!idNumber) {
      throw new Error("Please enter your passport number");
    }

    const isValidPassport = validatePassport(idNumber);
    if (!isValid) {
      throw new Error("Invalid passport number");
    }
  }

  const updateData = {
    country,
    countryFlag,
    nationalId: country === "India" ? idNumber : null,
    passport: country !== "India" ? idNumber : null,
    idType: country === "India" ? idType : "passport",
    phone,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: false });
  redirect("/");
}

// Validation functions
function validateIndianId(idType, idNumber) {
  const cleanedId = idNumber.replace(/\s/g, ""); // Remove spaces

  switch (idType) {
    case "aadhar":
      // Aadhar: 12 digits, no alphabet characters
      return /^\d{12}$/.test(cleanedId);

    case "pan":
      // PAN: 10 characters, 5 letters + 4 numbers + 1 letter
      return /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(cleanedId);

    case "voter":
      // Voter ID: EP followed by 7 digits (simplified)
      return /^[A-Z]{2}\d{7}$/.test(cleanedId.toUpperCase());

    case "driver":
      // Driver's License: varies by state, basic length check
      return cleanedId.length >= 8 && cleanedId.length <= 20;

    default:
      return false;
  }
}

function validatePassport(passportNumber) {
  // Passport: alphanumeric, 6-9 characters
  const cleaned = passportNumber.replace(/\s/g, "");
  return /^[A-Z0-9]{6,9}$/i.test(cleaned);
}

function getIndianIdTypeName(idType) {
  const typeMap = {
    aadhar: "Aadhar Card",
    pan: "PAN Card",
    voter: "Voter Card",
    driver: "Driver License",
  };
  return typeMap[idType] || "ID";
}
