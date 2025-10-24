// Extra price for each cabin at full capacity
export const EXTRA_GUEST_PRICE = 800;

// New combination logic with flexible cabin capacities
export function findExactCombinations(retreats, targetGuests) {
  const results = [];

  // Filter retreats by type with specific capacities
  const roomsWithCapacity2 = retreats.filter(
    (r) => r.type === "room" && r.maxCapacity === 2
  );
  // Cabins can accommodate 2 OR 3 guests (flexible capacity)
  const cabinsWithFlexibleCapacity = retreats.filter(
    (r) => r.type === "cabin" && r.maxCapacity === 3
  );

  const availableRetreats = [
    ...roomsWithCapacity2,
    ...cabinsWithFlexibleCapacity,
  ];

  for (let count = 1; count <= 4; count++) {
    findExactCombinationsRecursive(
      availableRetreats,
      targetGuests,
      count,
      results,
      []
    );
  }

  return results.sort((a, b) => a.retreats.length - b.retreats.length);
}

function findExactCombinationsRecursive(
  retreats,
  targetGuests,
  count,
  results,
  current = [],
  start = 0
) {
  if (current.length === count) {
    const cabinCombinations = generateCabinCapacityCombinations(
      current,
      targetGuests
    );

    cabinCombinations.forEach((combo) => {
      const totalCapacity = combo.retreats.reduce(
        (sum, retreat) => sum + retreat.usedCapacity,
        0
      );

      if (totalCapacity === targetGuests) {
        const retreatIds = combo.retreats
          .map((r) => `${r.type}-${r.id}-${r.usedCapacity}`)
          .sort()
          .join(",");
        const isDuplicate = results.some(
          (result) =>
            result.retreats
              .map((r) => `${r.type}-${r.id}-${r.usedCapacity}`)
              .sort()
              .join(",") === retreatIds
        );

        if (!isDuplicate) {
          results.push({
            retreats: combo.retreats,
            totalCapacity: totalCapacity,
          });
        }
      }
    });
    return;
  }

  for (let i = start; i < retreats.length; i++) {
    current.push(retreats[i]);
    findExactCombinationsRecursive(
      retreats,
      targetGuests,
      count,
      results,
      current,
      i + 1
    );
    current.pop();
  }
}

function generateCabinCapacityCombinations(retreats, targetGuests) {
  const cabins = retreats.filter((r) => r.type === "cabin");
  const rooms = retreats.filter((r) => r.type === "room");

  const roomCapacity = rooms.length * 2;
  const remainingCapacity = targetGuests - roomCapacity;

  if (remainingCapacity < 0) return [];

  const cabinCombinations = [];
  const cabinCount = cabins.length;
  const maxCabinCapacity = cabinCount * 3;
  const minCabinCapacity = cabinCount * 2;

  if (
    remainingCapacity < minCabinCapacity ||
    remainingCapacity > maxCabinCapacity
  ) {
    return [];
  }

  for (let i = 0; i < Math.pow(2, cabinCount); i++) {
    let cabinSum = 0;
    const cabinAssignment = [];

    for (let j = 0; j < cabinCount; j++) {
      const capacity = i & (1 << j) ? 3 : 2;
      cabinSum += capacity;
      cabinAssignment.push({
        capacity: capacity,
        isFull: capacity === 3,
      });
    }

    if (cabinSum === remainingCapacity) {
      const combinationRetreats = [];

      rooms.forEach((room) => {
        combinationRetreats.push({
          ...room,
          usedCapacity: 2,
          isFull: undefined,
        });
      });

      cabins.forEach((cabin, index) => {
        combinationRetreats.push({
          ...cabin,
          usedCapacity: cabinAssignment[index].capacity,
          isFull: cabinAssignment[index].isFull,
        });
      });

      cabinCombinations.push({
        retreats: combinationRetreats,
        totalCapacity: roomCapacity + cabinSum,
      });
    }
  }

  return cabinCombinations;
}
