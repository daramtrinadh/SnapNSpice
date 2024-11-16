/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["snapnspice-1.onrender.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
