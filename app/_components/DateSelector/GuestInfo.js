function GuestInfo({ type, numGuests, extraGuestPrice }) {
  const isCabin = type === "cabin";

  if (!isCabin || numGuests === 0) return null;

  return (
    <div className="w-full sm:w-auto text-center">
      <p className="text-sm font-semibold text-primary-700">
        {numGuests <= 2 ? (
          <span className="bg-green-100 px-3 py-1 rounded">
            Base price includes {numGuests} guest(s)
          </span>
        ) : (
          <span className="bg-accent-600 px-3 py-1 rounded">
            {numGuests - 2} extra guest(s) × ₹{extraGuestPrice}/night
          </span>
        )}
      </p>
    </div>
  );
}

export default GuestInfo;
