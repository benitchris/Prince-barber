import type { NextConfig } from "next";

/**
 * GitHub Pages project sites are served from /<repository-name>.
 * The deploy workflow sets NEXT_PUBLIC_BASE_PATH automatically.
 * For a custom domain or a <username>.github.io repository, leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
