import { beforeEach, describe, expect, it, vi } from 'vitest'

const find = vi.fn()

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', () => ({
    getPayload: vi.fn(async () => ({ find })),
}))

const { decodeParam, findBySlug } = await import('./payload')

const docs = (...slugs: string[]) => ({
    docs: slugs.map((slug, i) => ({ id: String(i), slug })),
})

describe('findBySlug', () => {
    beforeEach(() => find.mockReset())

    it('searches with `like` in German without pagination', async () => {
        find.mockResolvedValue(docs('/hunde/summer'))
        await findBySlug('dogs', 'summer', '/hunde/summer')
        expect(find).toHaveBeenCalledWith({
            collection: 'dogs',
            locale: 'de',
            where: { slug: { like: 'summer' } },
            pagination: false,
        })
    })

    it('prefers an exact match of the full path', async () => {
        find.mockResolvedValue(
            docs('/hunde/summer-2', '/wuerfe/summer', '/hunde/summer')
        )
        const doc = await findBySlug('dogs', 'summer', '/hunde/summer')
        expect(doc?.slug).toBe('/hunde/summer')
    })

    it('then prefers a slug ending with the value', async () => {
        find.mockResolvedValue(docs('/hunde/summer-2', '/old/summer'))
        const doc = await findBySlug('dogs', 'summer', '/hunde/summer')
        expect(doc?.slug).toBe('/old/summer')
    })

    it('falls back to the first match like the Express version', async () => {
        find.mockResolvedValue(docs('/hunde/summer-2', '/hunde/summers'))
        const doc = await findBySlug('dogs', 'summer', '/hunde/summer')
        expect(doc?.slug).toBe('/hunde/summer-2')
    })

    it('returns undefined without matches', async () => {
        find.mockResolvedValue(docs())
        expect(await findBySlug('pages', '/nope')).toBeUndefined()
    })
})

describe('decodeParam', () => {
    it('decodes URL encoded umlauts', () => {
        expect(decodeParam('W%C3%BCrfe')).toBe('Würfe')
    })

    it('returns malformed values unchanged', () => {
        expect(decodeParam('%E0%A4%A')).toBe('%E0%A4%A')
    })
})
