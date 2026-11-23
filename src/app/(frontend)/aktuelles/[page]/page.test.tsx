import { describe, expect, it, vi } from 'vitest'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))

const { default: NewsPaginated } = await import('./page')
const { CmsPage, NewsPage } = await import('@/components/pages')

const props = (page: string) => ({ params: Promise.resolve({ page }) })

describe('/aktuelles/[page]', () => {
    it('shows the news page for numbers', async () => {
        const element = await NewsPaginated(props('3'))
        expect(element.type).toBe(NewsPage)
        expect(element.props).toEqual({ page: 3 })
    })

    it.each(['0', 'abc', '2a', '-1'])(
        'treats %s as CMS page below /aktuelles',
        async (page) => {
            const element = await NewsPaginated(props(page))
            expect(element.type).toBe(CmsPage)
            expect(element.props).toEqual({ path: `/aktuelles/${page}` })
        }
    )
})
