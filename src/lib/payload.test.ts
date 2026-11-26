import { beforeEach, describe, expect, it, vi } from 'vitest'

const find = vi.fn()
const findGlobal = vi.fn()

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', () => ({
    getPayload: vi.fn(async () => ({ find, findGlobal })),
}))
vi.mock('next/navigation', () => ({
    permanentRedirect: vi.fn((url: string) => {
        throw new Error(`redirect ${url}`)
    }),
}))

const {
    decodeParam,
    findBySlug,
    findBySlugOrRedirect,
    findGlobal: global,
} = await import('./payload')

const docs = (...slugs: string[]) => ({
    docs: slugs.map((slug, i) => ({ id: String(i), slug })),
})

describe('findBySlug', () => {
    beforeEach(() => find.mockReset())

    it('finds the exact slug in German', async () => {
        find.mockResolvedValue(docs('/hunde/summer'))
        const doc = await findBySlug('dogs', '/hunde/summer')
        expect(doc?.slug).toBe('/hunde/summer')
        expect(find).toHaveBeenCalledWith({
            collection: 'dogs',
            locale: 'de',
            where: { slug: { equals: '/hunde/summer' } },
            limit: 1,
        })
    })

    it('returns undefined without match', async () => {
        find.mockResolvedValue(docs())
        expect(await findBySlug('pages', '/nope')).toBeUndefined()
    })
})

describe('findBySlugOrRedirect', () => {
    beforeEach(() => find.mockReset())

    it('returns the exact match without looking further', async () => {
        find.mockResolvedValueOnce(docs('/hunde/summer'))
        const doc = await findBySlugOrRedirect('dogs', '/hunde/summer')
        expect(doc?.slug).toBe('/hunde/summer')
        expect(find).toHaveBeenCalledTimes(1)
    })

    it('redirects old URLs to the only document ending with the last segment', async () => {
        find.mockResolvedValueOnce(docs()).mockResolvedValueOnce(
            docs('/hunde/summer-2', '/hunde/summer')
        )
        await expect(
            findBySlugOrRedirect('dogs', '/hunde/Summer')
        ).rejects.toThrow('redirect /hunde/summer')
        expect(find).toHaveBeenLastCalledWith({
            collection: 'dogs',
            locale: 'de',
            where: { slug: { like: 'summer' } },
            pagination: false,
        })
    })

    it('is a 404 (undefined) when several documents would fit', async () => {
        find.mockResolvedValueOnce(docs()).mockResolvedValueOnce(
            docs('/old/summer', '/hunde/summer')
        )
        expect(await findBySlugOrRedirect('dogs', '/x/summer')).toBeUndefined()
    })

    it('no longer serves an arbitrary partial match', async () => {
        find.mockResolvedValueOnce(docs()).mockResolvedValueOnce(
            docs('/hunde/summer-2', '/hunde/summers')
        )
        expect(
            await findBySlugOrRedirect('dogs', '/hunde/summer')
        ).toBeUndefined()
    })
})

describe('findGlobal', () => {
    it('loads the German version', async () => {
        findGlobal.mockResolvedValue({ title: 'x' })
        expect(await global('home')).toEqual({ title: 'x' })
        expect(findGlobal).toHaveBeenCalledWith({ slug: 'home', locale: 'de' })
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
