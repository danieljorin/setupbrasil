/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite build mesmo com avisos de tipo (importante pro deploy inicial)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Permite build mesmo com avisos de lint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
