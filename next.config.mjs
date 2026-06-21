/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote images (e.g. CMS-hosted team photos). Tighten per client.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
