import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dog } from '@/test/fixtures'
import { paginated, payloadMock } from '@/test/payloadMock'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))
vi.mock('next/headers', () => ({ headers: async () => new Headers() }))

const { default: LivePreviewPage } = await import('./page')
const { LivePreview } = await import('@/components/pages/LivePreview')

const props = (collection: string, id: string, locale?: string) => ({
    params: Promise.resolve({ collection, id }),
    searchParams: Promise.resolve({ locale }),
})
const admin = { id: 'u1', email: 'admin@example.com' }

describe('/live-preview/[collection]/[id]', () => {
    beforeEach(() => {
        payloadMock.auth.mockReset()
        payloadMock.findByID.mockReset()
    })

    it('is not available without login', async () => {
        payloadMock.auth.mockResolvedValue({ user: null })
        await expect(
            LivePreviewPage(props('dogs', 'dog-1'))
        ).rejects.toMatchObject({ digest: expect.stringContaining('404') })
        expect(payloadMock.findByID).not.toHaveBeenCalled()
    })

    it('loads the document with the rights of the logged in user', async () => {
        payloadMock.auth.mockResolvedValue({ user: admin })
        const summer = dog()
        payloadMock.findByID.mockResolvedValue(summer)

        const element = await LivePreviewPage(props('dogs', 'dog-1', 'en'))

        expect(payloadMock.findByID).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: 'dogs',
                id: 'dog-1',
                locale: 'en',
                depth: 2,
                user: admin,
                overrideAccess: false,
            })
        )
        expect(element.type).toBe(LivePreview)
        expect(element.props).toEqual({ type: 'dogs', initialData: summer })
    })

    it('loads the home global with the latest news', async () => {
        payloadMock.auth.mockResolvedValue({ user: admin })
        payloadMock.findGlobal.mockResolvedValue({ id: 'home', title: 'Hi' })
        payloadMock.find.mockResolvedValue(
            paginated([
                {
                    id: 'n',
                    title: 'Welpen',
                    publishedAt: null,
                    link: null,
                    content: [],
                },
            ])
        )

        const element = await LivePreviewPage(props('globals', 'home'))

        expect(element.props).toEqual({
            type: 'home',
            initialData: { id: 'home', title: 'Hi' },
            news: [{ id: 'n', title: 'Welpen', publishedAt: null, link: null }],
        })
    })

    it.each([
        ['users', 'u1'],
        ['media', 'm1'],
        ['globals', 'seo'],
    ])('has no preview for %s/%s', async (collection, id) => {
        payloadMock.auth.mockResolvedValue({ user: admin })
        await expect(
            LivePreviewPage(props(collection, id))
        ).rejects.toMatchObject({ digest: expect.stringContaining('404') })
    })

    it('responds with 404 for unknown documents', async () => {
        payloadMock.auth.mockResolvedValue({ user: admin })
        payloadMock.findByID.mockResolvedValue(null)
        await expect(
            LivePreviewPage(props('pages', 'gibtsnicht'))
        ).rejects.toMatchObject({ digest: expect.stringContaining('404') })
    })
})
