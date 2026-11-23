import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { paragraph } from '@/test/fixtures'
import { paginated, payloadMock } from '@/test/payloadMock'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))

const { CmsPage, cmsPageMetadata } = await import('./CmsPage')

const page = {
    id: '1',
    title: 'Kontakt',
    slug: '/kontakt',
    metaTitle: 'Kontakt aufnehmen',
    metaDescription: 'So erreicht ihr uns',
    content: [
        { id: 'b', blockType: 'richtext', content: [paragraph('Ruft an')] },
    ],
}

describe('CmsPage', () => {
    beforeEach(() => {
        payloadMock.find.mockReset()
        payloadMock.findGlobal.mockResolvedValue({ metaTitle: 'Default' })
    })

    it('renders the page found by its path', async () => {
        payloadMock.find.mockResolvedValue(paginated([page]))
        render(await CmsPage({ path: '/kontakt' }))
        expect(
            screen.getByRole('heading', { level: 1, name: 'Kontakt' })
        ).toBeInTheDocument()
        expect(screen.getByText('Ruft an')).toBeInTheDocument()
        expect(payloadMock.find).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: 'pages',
                where: { slug: { like: '/kontakt' } },
            })
        )
    })

    it('responds with 404 for unknown paths', async () => {
        payloadMock.find.mockResolvedValue(paginated([]))
        await expect(CmsPage({ path: '/gibtsnicht' })).rejects.toMatchObject({
            digest: expect.stringContaining('404'),
        })
    })

    it('builds the metadata from the page', async () => {
        payloadMock.find.mockResolvedValue(paginated([page]))
        expect(await cmsPageMetadata('/kontakt')).toMatchObject({
            title: 'Kontakt aufnehmen',
            description: 'So erreicht ihr uns',
            openGraph: { url: 'https://www.example.com/kontakt' },
        })
    })

    it('has no metadata for unknown paths', async () => {
        payloadMock.find.mockResolvedValue(paginated([]))
        expect(await cmsPageMetadata('/gibtsnicht')).toEqual({})
    })
})
