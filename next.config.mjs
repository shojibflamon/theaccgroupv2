/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['placehold.co'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
          {
            protocol: 'https',
            hostname: 'flowbite.s3.amazonaws.com',
          },
          {
            protocol: 'https',
            hostname: 'theaccgroup.s3.ap-southeast-1.amazonaws.com',
          },
        ],
      },
};

export default nextConfig;
