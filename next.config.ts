import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_MAP_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN,
    NEXT_PUBLIC_MAP_SESSION_TOKEN: process.env.NEXT_PUBLIC_MAP_SESSION_TOKEN
  }
};

export default nextConfig;
