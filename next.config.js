/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: true,
    env: {
        API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    ...(process.env.NODE_ENV === 'production' && {
        typescript: {
            ignoreBuildErrors: true,
        },
        eslint: {
            ignoreDuringBuilds: true,
        },
    }),
}

module.exports = nextConfig
