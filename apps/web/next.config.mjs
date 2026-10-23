/** @type {import('next').NextConfig} */
const internalApiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
const isStaticExport = process.env.NEXT_OUTPUT === "export" || process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        ...(internalApiUrl
          ? {
              async rewrites() {
                return {
                  beforeFiles: [
                    {
                      source: "/api/:path*",
                      destination: `${internalApiUrl}/api/:path*`,
                    },
                    {
                      source: "/health",
                      destination: `${internalApiUrl}/health`,
                    },
                  ],
                };
              },
              experimental: {
                proxyTimeout: 300000,
              },
            }
          : {}),
      }),
};

export default nextConfig;
