import { beforeEach, describe, expect, it, vi } from 'vitest'
import { media } from '@/test/fixtures'

const getSeo = vi.fn()
vi.mock('./payload', () => ({ getSeo: () => getSeo() }))

const { buildMetadata } = await import('./metadata')

const seo = {
    metaTitle: 'Moments of Love',
    metaDescription: 'Golden Retriever Zucht',
    metaKeywords: 'golden, retriever',
    author: 'Familie Muster',
    pageUrl: 'https://www.example.com',
    image: media('seo'),
}

describe('buildMetadata', () => {
    beforeEach(() => getSeo.mockResolvedValue(seo))

    it('uses the SEO global as default', async () => {
        const meta = await buildMetadata()
        expect(meta).toMatchObject({
            title: 'Moments of Love',
            description: 'Golden Retriever Zucht',
            keywords: 'golden, retriever',
            authors: [{ name: 'Familie Muster' }],
            robots: 'index,follow',
            other: { title: 'Moments of Love', copyright: 'Familie Muster' },
            openGraph: {
                url: 'https://www.example.com',
                images: ['/api/media/file/seo.jpg'],
            },
            twitter: { card: 'summary_large_image' },
        })
    })

    it('lets the page override the defaults', async () => {
        const meta = await buildMetadata({
            metaTitle: 'Summer',
            metaDescription: 'Unsere Hündin',
            metaKeywords: 'summer',
            image: media('summer'),
            pageUrl: 'https://www.example.com/hunde/summer',
        })
        expect(meta).toMatchObject({
            title: 'Summer',
            description: 'Unsere Hündin',
            keywords: 'summer',
            openGraph: {
                title: 'Summer',
                url: 'https://www.example.com/hunde/summer',
                images: ['/api/media/file/summer.jpg'],
            },
        })
    })

    it('ignores empty overrides', async () => {
        const meta = await buildMetadata({ metaTitle: '', metaKeywords: null })
        expect(meta.title).toBe('Moments of Love')
        expect(meta.keywords).toBe('golden, retriever')
    })

    it('has no image when the upload is not populated', async () => {
        getSeo.mockResolvedValue({ ...seo, image: 'some-id', author: null })
        const meta = await buildMetadata()
        expect(meta.openGraph?.images).toBeUndefined()
        expect(meta.authors).toBeUndefined()
        expect(meta.other).toEqual({ title: 'Moments of Love' })
    })
})
