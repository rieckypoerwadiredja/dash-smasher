import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "plus.unsplash.com",
      "template.canva.com",
      "images.unsplash.com",
      "images.remotePatterns",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
