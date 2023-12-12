/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    images: {domains: ["lh3.googleusercontent.com", "files.stripe.com"]}
}

module.exports = nextConfig
