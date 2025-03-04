/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gdnumfwcwysjtibwfoke.supabase.co",
                port: "",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
