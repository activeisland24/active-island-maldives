/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // NOTE: placeholder photography is served from Unsplash source URLs so the
    // site is visually complete out of the box. Replace every image reference
    // in /data and /components with real Active Island photography before launch,
    // then remove this remotePattern (or keep it if Unsplash stays a fallback source).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
