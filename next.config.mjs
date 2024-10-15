/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',
            },
        ]
    }
};

export default nextConfig;
