/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //Only For Next.js versions prior to 14.1.0 because it is enabled by default since version 14.1.0
    windowHistorySupport: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
