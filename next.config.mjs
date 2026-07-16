/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    eslint: {
      ignoreDuringBuilds: true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
