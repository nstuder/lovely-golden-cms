// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { paginated, payloadMock } from '@/test/payloadMock'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))

const { default: sitemap } = await import('./sitemap')

describe('sitemap', () => {
    it('lists navigation pages, galleries and dogs', async () => {
        payloadMock.findGlobal.mockResolvedValue({
            items: [
                {
                    type: 'link',
                    linkType: 'internal',
                    pageIntern: { value: { slug: '/kontakt' } },
                },
                {
                    type: 'link',
                    linkType: 'external',
                    pageExtern: 'https://vdh.de',
                },
                {
                    type: 'subMenu',
                    subMenu: {
                        items: [
                            {
                                linkType: 'internal',
                                slugIntern: { value: { slug: '/wuerfe/a' } },
                            },
                            // not populated -> skipped
                            {
                                linkType: 'internal',
                                slugIntern: { value: 'x' },
                            },
                        ],
                    },
                },
            ],
        })
        payloadMock.find.mockImplementation(async ({ collection }) =>
            collection === 'gallery'
                ? paginated([{ slug: '/galerie/welpen' }])
                : paginated([{ slug: '/hunde/summer' }, { slug: null }])
        )

        expect(await sitemap()).toEqual([
            { url: 'https://www.example.com/kontakt' },
            { url: 'https://vdh.de' },
            { url: 'https://www.example.com/wuerfe/a' },
            { url: 'https://www.example.com/galerie/welpen' },
            { url: 'https://www.example.com/hunde/summer' },
        ])
    })
})
