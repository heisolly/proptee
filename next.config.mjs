/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'proptee.ng',
            },
            {
                protocol: 'https',
                hostname: 'websitedemos.net',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'http',
                hostname: 'dev261.kodesolution.com',
            }
        ],
    },
};

export default nextConfig;
