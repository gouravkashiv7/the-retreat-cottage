import RetreatSection from "../RetreatSection";

function AllRetreatsView({ rooms, cabins }) {
  return (
    <>
      <RetreatSection
        title="Villa Rooms"
        retreats={rooms}
        type="room"
        emptyMessage="Villa rooms coming soon."
        className="mb-12 sm:mb-16"
      />
      <RetreatSection
        title="Wooden Cabins"
        retreats={cabins}
        type="cabin"
        emptyMessage="Wooden cabins coming soon."
      />
    </>
  );
}

export default AllRetreatsView;
