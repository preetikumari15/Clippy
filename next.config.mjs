/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // You can add other domains here later (e.g., 'clerk.com', 'firebasestorage.googleapis.com')
    ],
  },
};

export default nextConfig;
