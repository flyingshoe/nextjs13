/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/findJob/:path*",
        destination: "https://api.mycareersfuture.gov.sg/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.mycareersfuture.gov.sg",
        pathname: "/images/company/logos/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
