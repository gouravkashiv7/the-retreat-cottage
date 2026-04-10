import { notFound } from "next/navigation";
import { getRooms, getCabins, getSettings } from "@/app/_lib/data-service";
import ComboDetailsHeader from "@/app/_components/combo/ComboDetailsHeader";
import ComboRetreatsList from "@/app/_components/combo/ComboRetreatsList";
import ComboBookingSummary from "@/app/_components/combo/ComboBookingSummary";
import {
  regenerateCombo,
  parseComboId,
  calculateCombinationPricing,
} from "@/app/_components/utils/combo-utils";
import { getAllBookedDates } from "@/app/_lib/dates";
import { auth } from "@/app/_lib/auth";

export default async function ComboDetailsPage({ params }) {
  const session = await auth();
  const guestId = session?.user?.guestId;
  const bookedDates = await getAllBookedDates();
  const { comboId } = await params;
  const settings = await getSettings();
  const { extraGuestPrice } = settings;
  const comboParams = parseComboId(comboId);
  if (!comboParams) {
    notFound();
  }

  const { optionNumber, guestCount } = comboParams;
  const combination = await regenerateCombo(comboId, guestCount, optionNumber);

  if (!combination) {
    notFound();
  }

  const pricing = calculateCombinationPricing(combination, extraGuestPrice);

  return (
    <div className="min-h-screen bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <ComboDetailsHeader
            optionNumber={optionNumber}
            guestCount={guestCount}
            totalCapacity={combination.totalCapacity}
            fullCapacityCabins={pricing.fullCapacityCabins}
            extraGuestPrice={extraGuestPrice}
            retreats={combination.retreats}
            settings={settings}
            bookedDates={bookedDates}
            guestId={guestId}
          />

          {/* Group-specific USP */}
          <div className="mt-8 p-6 bg-accent-500/5 border border-accent-500/10 rounded-[2rem] backdrop-blur-md">
            <p className="text-accent-300 text-sm md:text-base font-light italic text-center leading-relaxed">
              &quot;Your private mountain sanctuary—no shared lobbies, and we allow music & Karaoke for our guests until 10 PM. 
              Ideal for groups of up to 15 guests.&quot;
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Retreats List - Left Column */}
          <div className="lg:col-span-2">
            <ComboRetreatsList
              retreats={combination.retreats}
              extraGuestPrice={extraGuestPrice}
            />
          </div>

          {/* Booking Summary - Right Column (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ComboBookingSummary
                retreats={combination.retreats}
                guestCount={guestCount}
                retreatCount={combination.retreats.length}
                totalCapacity={combination.totalCapacity}
                pricing={pricing}
                comboId={comboId}
                extraGuestPrice={extraGuestPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for common combinations
export async function generateStaticParams() {
  const commonGuestCounts = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
  const { comboId } = await params;
  const comboParams = parseComboId(comboId);

  if (!comboParams) {
    return {
      title: "Combination Not Found",
    };
  }

  const { optionNumber, guestCount } = comboParams;

  return {
    title: `Retreat Combination for ${guestCount} Guests | Option ${optionNumber}`,
    description: `Book this private retreat combination for ${guestCount} guests (Max 15 total). Perfect for family reunions. Experience Pure Veg luxury with music & Karaoke near Kasauli.`,
    alternates: {
      canonical: `/combo/${comboId}`,
    },
  };
}
