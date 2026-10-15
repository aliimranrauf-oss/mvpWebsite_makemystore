/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // One canonical host: send makemystore.online to www (301), so link equity isn't split.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "makemystore.online" }],
        destination: "https://www.makemystore.online/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Matches every Supabase project's storage host
        // (https://<project-ref>.supabase.co/storage/...).
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
