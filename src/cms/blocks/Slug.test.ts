// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { checkSlugFormat, normalizeSlug, slugField } from './Slug'

describe('normalizeSlug', () => {
    it.each([
        ['Summer ', '/hunde/summer'],
        ['/Hunde/Summer/', '/hunde/summer'],
        ['/zucht//neue seite', '/zucht/neue-seite'],
        ['/', '/'],
        ['', ''],
    ])('%j -> %j', (input, expected) => {
        expect(normalizeSlug(input, '/hunde/')).toBe(expected)
    })

    it('leaves non-strings alone', () => {
        expect(normalizeSlug(null)).toBeNull()
    })
})

describe('checkSlugFormat', () => {
    it.each([
        '/kontakt',
        '/zucht/rassenstandard',
        '/wuerfe/a-wurf',
        '/galerie/2013',
    ])('accepts the existing slug %s', (slug) =>
        expect(checkSlugFormat(slug)).toBe(true)
    )

    it.each(['/', 'kontakt', '/a b', '/a?b', '/hunde/'])('rejects %j', (slug) =>
        expect(checkSlugFormat(slug)).toMatch(/Kleinbuchstaben/)
    )

    it('requires the prefix of the website route', () => {
        expect(checkSlugFormat('/summer', '/hunde/')).toMatch(/\/hunde\//)
        expect(checkSlugFormat('/hunde/summer', '/hunde/')).toBe(true)
    })
})

describe('slugField', () => {
    const field = slugField({ prefix: '/hunde/', localized: true })
    const count = vi.fn()
    const validate = (value: string, extra: object = {}) =>
        (field.validate as (value: string, options: unknown) => unknown)(
            value,
            {
                collectionSlug: 'dogs',
                event: 'submit',
                id: 'self',
                required: true,
                req: { locale: 'de', payload: { count }, t: (k: string) => k },
                ...extra,
            } as never
        )

    it('is indexed, required and localized as configured', () => {
        expect(field).toMatchObject({
            name: 'slug',
            index: true,
            required: true,
            localized: true,
        })
    })

    it('normalizes before validation', () => {
        const hook = field.hooks!.beforeValidate![0]
        expect(hook({ value: 'Summer' } as never)).toBe('/hunde/summer')
    })

    it('rejects a slug another document already uses', async () => {
        count.mockResolvedValueOnce({ totalDocs: 1 })
        expect(await validate('/hunde/summer')).toMatch(/schon/)
        expect(count).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: 'dogs',
                locale: 'de',
                where: {
                    slug: { equals: '/hunde/summer' },
                    id: { not_equals: 'self' },
                },
            })
        )
    })

    it('accepts a free slug', async () => {
        count.mockResolvedValueOnce({ totalDocs: 0 })
        expect(await validate('/hunde/neu')).toBe(true)
    })

    it('does not query the database while typing', async () => {
        count.mockClear()
        expect(await validate('/hunde/neu', { event: 'onChange' })).toBe(true)
        expect(count).not.toHaveBeenCalled()
    })

    it('still requires a value', async () => {
        expect(await validate('')).not.toBe(true)
    })

    it('is used by every collection with a page on the website', async () => {
        const { default: config } = await import('../payload.config')
        const built = await config
        const prefixes = Object.fromEntries(
            built.collections
                .filter((c) =>
                    c.fields.some((f) => 'name' in f && f.name === 'slug')
                )
                .map((c) => {
                    const slug = c.fields.find(
                        (f) => 'name' in f && f.name === 'slug'
                    ) as { index?: boolean; admin?: { description?: string } }
                    return [c.slug, slug.index && slug.admin?.description]
                })
        )
        expect(prefixes).toEqual({
            dogs: 'z. B. /hunde/name',
            gallery: 'z. B. /galerie/name',
            litters: 'z. B. /wuerfe/name',
            pages: 'z. B. /kontakt',
        })
    })
})
