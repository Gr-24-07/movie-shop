/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www.themoviedb.org",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "media.themoviedb.org",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
