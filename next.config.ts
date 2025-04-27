import { readFileSync } from "fs";
import { join } from "path";

// Define the Next.js configuration
const nextConfig = {
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // HTTPS configuration for local development (optional)
  devServer: {
    https: {
      key: readFileSync(join(__dirname, "localhost.key")),
      cert: readFileSync(join(__dirname, "localhost.crt")),
    },
  },
};

// Export the configuration using module.exports
module.exports = nextConfig;
