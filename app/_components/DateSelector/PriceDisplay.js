import { differenceInDays } from "date-fns";

function PriceDisplay({ range, retreat, settings, type, numGuests }) {
  const { regularPrice, discount: discountPercentage } = retreat;
  const numNights = differenceInDays(range?.to, range?.from);
  const discount = Math.round((regularPrice * discountPercentage) / 100);

  // Calculate base cabin price (for 1-2 guests)
  let baseCabinPrice = numNights * (regularPrice - discount);

  // Calculate extra guest charges for cabin type
  const isCabin = type === "cabin";
  const maxGuestsIncluded = 2;
  const extraGuests = Math.max(0, numGuests - maxGuestsIncluded);
  const extraGuestTotal = isCabin
    ? extraGuests * settings.extraGuestPrice * numNights
    : 0;
  const hasExtraGuests = isCabin && numGuests > maxGuestsIncluded;

  const totalPrice = baseCabinPrice + extraGuestTotal;

  if (!numNights) {
    return (
      <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 justify-center sm:justify-start">
        <PricePerNight regularPrice={regularPrice} discount={discount} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 justify-center sm:justify-start">
      <PricePerNight regularPrice={regularPrice} discount={discount} />

      <NightsMultiplier numNights={numNights} />

      {hasExtraGuests && extraGuestTotal > 0 && (
        <ExtraGuestCharges
          extraGuestPrice={settings.extraGuestPrice}
          extraGuests={extraGuests}
          extraGuestTotal={extraGuestTotal}
        />
      )}

      <TotalPrice totalPrice={totalPrice} />
    </div>
  );
}

function PricePerNight({ regularPrice, discount }) {
  return (
    <p className="flex gap-2 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-xl sm:text-2xl">
            ₹{regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-700 text-sm sm:text-base">
            ₹{regularPrice}
          </span>
        </>
      ) : (
        <span className="text-xl sm:text-2xl">₹{regularPrice}</span>
      )}
      <span className="text-sm sm:text-base">/night (1-2 guests)</span>
    </p>
  );
}

function NightsMultiplier({ numNights }) {
  return (
    <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl rounded-lg">
      <span>&times;</span> <span>{numNights}</span>
    </p>
  );
}

function ExtraGuestCharges({ extraGuestPrice, extraGuests, extraGuestTotal }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-semibold">
        + ₹{extraGuestPrice}/night × {extraGuests} extra guest(s)
      </p>
      <p className="text-sm">Extra guests: ₹{extraGuestTotal}</p>
    </div>
  );
}

function TotalPrice({ totalPrice }) {
  return (
    <p className="text-center sm:text-left">
      <span className="text-base sm:text-lg font-bold uppercase">Total</span>{" "}
      <span className="text-xl sm:text-2xl font-semibold">₹{totalPrice}</span>
    </p>
  );
}

export default PriceDisplay;
