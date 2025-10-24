export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJ8XKSmxCHDzkRbRzTk5mMyBw"; // Your business's Place ID

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    const data = await response.json();

    if (data.result && data.result.reviews) {
      return Response.json({ reviews: data.result.reviews });
    }

    return Response.json({ reviews: [] });
  } catch (error) {
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
