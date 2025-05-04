/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        turbo: {},
    },
    devIndicators: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg|mp3|wav|mp4)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]', // Use just the name and extension
                    outputPath: 'audio/', // Change this to a simpler path
                },
            },
        });
        return config;
    },
};

module.exports = nextConfig;
