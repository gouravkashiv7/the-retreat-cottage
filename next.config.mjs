/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kckngulhvwryekywvutn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/room-images/**",
      },
      {
        protocol: "https",
        hostname: "kckngulhvwryekywvutn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
    // Move qualities to the root level here
    qualities: [60, 80, 90, 100],
  },
};

export default nextConfig;
