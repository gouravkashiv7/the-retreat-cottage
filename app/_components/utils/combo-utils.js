import { getRooms, getCabins } from "@/app/_lib/data-service";
import { findExactCombinations } from "./combo-logic";

// Function to regenerate the same combination logic
export async function regenerateCombo(comboId, guestCount, optionNumber) {
  const [rooms, cabins] = await Promise.all([getRooms(), getCabins()]);

  if (!rooms || !cabins) return null;

  const allRetreats = [
    ...rooms.map((room) => ({ ...room, type: "room" })),
    ...cabins.map((cabin) => ({ ...cabin, type: "cabin" })),
  ];

  const combinations = findExactCombinations(allRetreats, guestCount);

  if (combinations.length >= optionNumber) {
    return combinations[optionNumber - 1];
  }

  return null;
}

// Extract guest count and option number from comboId
export function parseComboId(comboId) {
  const match = comboId.match(/combo-(\d+)-(\d+)guests/);
  if (!match) return null;

  return {
    optionNumber: parseInt(match[1]),
    guestCount: parseInt(match[2]),
  };
}

// Calculate pricing for a combination
export function calculateCombinationPricing(combination, extraGuestPrice) {
  const totalPrice = combination.retreats.reduce((sum, retreat) => {
    const discount = Math.round(
      (retreat.regularPrice * (retreat.discount || 0)) / 100
    );
    const basePrice = retreat.regularPrice - discount;

    if (retreat.type === "cabin" && retreat.isFull) {
      return sum + basePrice + extraGuestPrice;
    }

    return sum + basePrice;
  }, 0);

  const totalOriginalPrice = combination.retreats.reduce((sum, retreat) => {
    const basePrice = retreat.regularPrice;

    if (retreat.type === "cabin" && retreat.isFull) {
      return sum + basePrice + extraGuestPrice;
    }

    return sum + basePrice;
  }, 0);

  const hasDiscount = totalPrice < totalOriginalPrice;
  const fullCapacityCabins = combination.retreats.filter(
    (retreat) => retreat.type === "cabin" && retreat.isFull
  ).length;

  return {
    totalPrice,
    totalOriginalPrice,
    hasDiscount,
    fullCapacityCabins,
    extraGuestPremium: fullCapacityCabins * extraGuestPrice,
  };
}
