export default function robots() {
  const baseUrl = "https://retreatcottage.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/api", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
