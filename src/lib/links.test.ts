import { describe, expect, it } from 'vitest'
import { internalSlug, linkHref } from './links'

describe('internalSlug', () => {
    it('returns the slug of a populated document', () => {
        expect(internalSlug({ value: { slug: '/hunde/summer' } })).toBe(
            '/hunde/summer'
        )
    })

    it('returns undefined for unpopulated or missing links', () => {
        expect(internalSlug({ value: '6512abc' })).toBeUndefined()
        expect(internalSlug({ value: { id: 'x' } })).toBeUndefined()
        expect(internalSlug({})).toBeUndefined()
        expect(internalSlug(null)).toBeUndefined()
        expect(internalSlug(undefined)).toBeUndefined()
    })
})

describe('linkHref', () => {
    const internal = { value: { slug: '/kontakt' } }

    it('uses the external URL for external links', () => {
        expect(linkHref('external', 'https://vdh.de', internal)).toBe(
            'https://vdh.de'
        )
        expect(linkHref('external', null, internal)).toBeUndefined()
    })

    it('uses the slug for internal links', () => {
        expect(linkHref('internal', 'https://vdh.de', internal)).toBe(
            '/kontakt'
        )
    })

    it('has no target without link type', () => {
        expect(linkHref(null, 'https://vdh.de', internal)).toBeUndefined()
    })
})
