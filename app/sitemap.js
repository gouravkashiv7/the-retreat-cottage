import { getCabins, getRooms } from "@/app/_lib/data-service";

export default async function sitemap() {
  const baseUrl = "https://retreatcottage.in";

  // Static routes (Removed /login to resolve robots.txt conflict)
  const staticRoutes = [
    "",
    "/about",
    "/retreats",
    "/guides",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/feedback",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/guides" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes for retreats and guides
  try {
    const [cabins, rooms] = await Promise.all([getCabins(), getRooms()]);

    const cabinRoutes = cabins.map((cabin) => ({
      url: `${baseUrl}/retreats/cabin/${cabin.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    const roomRoutes = rooms.map((room) => ({
      url: `${baseUrl}/retreats/room/${room.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    // Specific Guides
    const guideRoutes = [
      "/guides/kasauli",
      "/guides/solan",
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Common combos (Max 12 adults as per user feedback)
    const commonGuestCounts = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    const comboRoutes = [];
    for (const guestCount of commonGuestCounts) {
      for (let optionNumber = 1; optionNumber <= 3; optionNumber++) {
        comboRoutes.push({
          url: `${baseUrl}/combo/combo-${optionNumber}-${guestCount}guests`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      }
    }

    return [
      ...staticRoutes,
      ...cabinRoutes,
      ...roomRoutes,
      ...guideRoutes,
      ...comboRoutes,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticRoutes;
  }
}
