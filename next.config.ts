import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            // Payload 2 served uploads from /media/<file>. Keep those URLs
            // (search engines, shared links) working with Payload 3.
            {
                source: '/media/:path*',
                destination: '/api/media/file/:path*',
            },
        ]
    },
    webpack: (webpackConfig) => {
        webpackConfig.resolve.extensionAlias = {
            '.cjs': ['.cts', '.cjs'],
            '.js': ['.ts', '.tsx', '.js', '.jsx'],
            '.mjs': ['.mts', '.mjs'],
        }

        return webpackConfig
    },
    turbopack: {
        root: path.resolve(dirname),
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
