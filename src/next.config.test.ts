// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'

// withPayload only adds Payload's own settings, the headers are ours
vi.mock('@payloadcms/next/withPayload', () => ({
    withPayload: (config: unknown) => config,
}))

const { default: nextConfig } = await import('../next.config')

const headersFor = async (path: string) => {
    const rules = (await nextConfig.headers?.()) ?? []
    const matches = (source: string) =>
        new RegExp(`^${source.replace(':path*', '.*')}$`).test(path)
    return Object.fromEntries(
        rules
            .filter((rule) => matches(rule.source))
            .flatMap((rule) => rule.headers)
            .map(({ key, value }) => [key, value])
    )
}

describe('next.config', () => {
    it('hides the X-Powered-By header', () => {
        expect(nextConfig.poweredByHeader).toBe(false)
    })

    it.each(['/', '/hunde/summer', '/admin', '/api/dogs'])(
        'sends security headers for %s',
        async (path) => {
            expect(await headersFor(path)).toMatchObject({
                'Strict-Transport-Security': 'max-age=31536000',
                'X-Frame-Options': 'SAMEORIGIN',
                'Content-Security-Policy': "frame-ancestors 'self'",
                'X-Content-Type-Options': 'nosniff',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            })
        }
    )

    it('caches fonts and images from public/assets', async () => {
        expect(
            (await headersFor('/assets/fonts/gabrielle-webfont.woff2'))[
                'Cache-Control'
            ]
        ).toBe('public, max-age=2592000')
        expect(
            (await headersFor('/assets/img/logo-dark-medium.svg'))[
                'Cache-Control'
            ]
        ).toBe('public, max-age=2592000')
        expect(
            (await headersFor('/robots.txt'))['Cache-Control']
        ).toBeUndefined()
    })

    it('keeps the old /media URLs working', async () => {
        const rewrites = await nextConfig.rewrites?.()
        expect(rewrites).toContainEqual({
            source: '/media/:path*',
            destination: '/api/media/file/:path*',
        })
    })
})
