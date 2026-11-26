import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dog } from '@/test/fixtures'
import { paginated, payloadMock } from '@/test/payloadMock'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))

const { default: DogPage, generateMetadata } = await import('./page')
const { CmsPage } = await import('@/components/pages')
const { DogDetailTemplate } = await import('@/components/templates')

const props = (slug: string) => ({ params: Promise.resolve({ slug }) })

describe('/hunde/[slug]', () => {
    beforeEach(() => {
        payloadMock.find.mockReset()
        payloadMock.findGlobal.mockResolvedValue({})
    })

    it('renders the dog found by slug', async () => {
        const summer = dog()
        payloadMock.find.mockResolvedValue(paginated([summer]))
        const element = await DogPage(props('summer'))
        expect(element.type).toBe(DogDetailTemplate)
        expect(element.props).toEqual({ dog: summer })
        expect(payloadMock.find).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: 'dogs',
                where: { slug: { equals: '/hunde/summer' } },
            })
        )
    })

    it('falls back to a CMS page with the decoded path', async () => {
        payloadMock.find.mockResolvedValue(paginated([]))
        const element = await DogPage(props('M%C3%BCller'))
        expect(element.type).toBe(CmsPage)
        expect(element.props).toEqual({ path: '/hunde/Müller' })
    })

    it('uses breeding name and name as title', async () => {
        payloadMock.find.mockResolvedValue(
            paginated([dog({ metaDescription: 'Unsere Hündin' })])
        )
        expect(await generateMetadata(props('summer'))).toMatchObject({
            title: 'Summer of Love - Summer',
            description: 'Unsere Hündin',
            openGraph: { url: 'https://www.example.com/hunde/summer' },
        })
    })
})
