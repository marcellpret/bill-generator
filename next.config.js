/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sxzhormxnuelqhqgpzay.supabase.co",
                port: "",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
