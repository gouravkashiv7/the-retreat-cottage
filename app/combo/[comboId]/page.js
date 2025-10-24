import { notFound } from "next/navigation";
import { getRooms, getCabins } from "@/app/_lib/data-service";
import ComboDetailsHeader from "@/app/_components/combo/ComboDetailsHeader";
import ComboRetreatsList from "@/app/_components/combo/ComboRetreatsList";
import ComboBookingSummary from "@/app/_components/combo/ComboBookingSummary";
import {
  regenerateCombo,
  parseComboId,
  calculateCombinationPricing,
} from "@/app/_components/utils/combo-utils";
import { EXTRA_GUEST_PRICE } from "@/app/_components/utils/combo-logic";

export default async function ComboDetailsPage({ params }) {
  const { comboId } = params;

  const comboParams = parseComboId(comboId);
  if (!comboParams) {
    notFound();
  }

  const { optionNumber, guestCount } = comboParams;
  const combination = await regenerateCombo(comboId, guestCount, optionNumber);

  if (!combination) {
    notFound();
  }

  const pricing = calculateCombinationPricing(combination, EXTRA_GUEST_PRICE);

  return (
    <div className="min-h-screen bg-primary-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComboDetailsHeader
          optionNumber={optionNumber}
          guestCount={guestCount}
          totalCapacity={combination.totalCapacity}
          fullCapacityCabins={pricing.fullCapacityCabins}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ComboRetreatsList retreats={combination.retreats} />
          </div>

          <div className="lg:col-span-1">
            <ComboBookingSummary
              guestCount={guestCount}
              retreatCount={combination.retreats.length}
              totalCapacity={combination.totalCapacity}
              pricing={pricing}
              comboId={comboId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for common combinations
export async function generateStaticParams() {
  const commonGuestCounts = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  const params = [];

  for (const guestCount of commonGuestCounts) {
    for (let optionNumber = 1; optionNumber <= 3; optionNumber++) {
      params.push({
        comboId: `combo-${optionNumber}-${guestCount}guests`,
      });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { comboId } = params;
  const comboParams = parseComboId(comboId);

  if (!comboParams) {
    return {
      title: "Combination Not Found",
    };
  }

  const { optionNumber, guestCount } = comboParams;

  return {
    title: `Retreat Combination for ${guestCount} Guests | Option ${optionNumber}`,
    description: `Book this retreat combination including multiple accommodations for ${guestCount} guests at the best price.`,
  };
}
