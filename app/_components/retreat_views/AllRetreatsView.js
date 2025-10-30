import RetreatSection from "../RetreatSection";

function AllRetreatsView({ rooms, cabins, bookedDates, guestId }) {
  return (
    <>
      <RetreatSection
        title="Villa Rooms"
        retreats={rooms}
        type="room"
        bookedDates={bookedDates}
        guestId={guestId}
        emptyMessage="Villa rooms not available for following dates."
        className="mb-12 sm:mb-16"
      />
      <RetreatSection
        title="Wooden Cabins"
        retreats={cabins}
        guestId={guestId}
        bookedDates={bookedDates}
        type="cabin"
        emptyMessage="Wooden cabins not available for following dates."
      />
    </>
  );
}

export default AllRetreatsView;
