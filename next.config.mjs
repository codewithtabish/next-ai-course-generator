/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "*", // Allow any domain
        pathname: "/**", // Allow any path
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
