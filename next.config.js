/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/findJob/:path*",
        destination: "https://api.mycareersfuture.gov.sg/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
