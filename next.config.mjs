/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups", // Adjust COOP policy
            },
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "require-corp", // Required for some API calls
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: "/api/recommend",
          destination: "http://34.55.214.192:8000/recommend", // Force HTTPS
        },
      ];
    },
  };
  
  export default nextConfig;
  