/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.myanimelist.net",
          pathname: "**",
        },
      ],
    },
    webpack: (config) => {
      config.externals = [...config.externals, "bcrypt"];
      return config;
    },
  };
  
  module.exports = nextConfig;
  