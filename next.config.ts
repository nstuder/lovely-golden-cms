import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

/** Sent with every response (website, admin and API). */
export const securityHeaders = [
    // only HTTPS for a year (Traefik redirects HTTP anyway)
    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
    // no embedding on other sites; the admin's live preview (same origin) still works
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()',
    },
]

/** Fonts and images in public/assets rarely change (the stylesheet is built by Next.js with a hashed name). */
export const assetCacheHeaders = [
    { key: 'Cache-Control', value: 'public, max-age=2592000' },
]

const nextConfig: NextConfig = {
    output: 'standalone',
    // hides "X-Powered-By: Next.js, Payload"
    poweredByHeader: false,
    async headers() {
        return [
            { source: '/:path*', headers: securityHeaders },
            { source: '/assets/fonts/:path*', headers: assetCacheHeaders },
            { source: '/assets/img/:path*', headers: assetCacheHeaders },
        ]
    },
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
