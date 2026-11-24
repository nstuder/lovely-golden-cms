// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { livePreviewConfig, livePreviewPath } from './livePreview'

type UrlFn = Extract<
    typeof livePreviewConfig.url,
    (...args: never[]) => unknown
>
type UrlArgs = Parameters<UrlFn>[0]
const url = (args: Partial<UrlArgs>) =>
    (livePreviewConfig.url as UrlFn)(args as UrlArgs)

describe('livePreviewPath', () => {
    it('builds the path of collection documents and globals', () => {
        expect(livePreviewPath({ collection: 'dogs', id: 'abc' })).toBe(
            '/live-preview/dogs/abc'
        )
        expect(livePreviewPath({ global: 'home' })).toBe(
            '/live-preview/globals/home'
        )
    })

    it('adds the locale', () => {
        expect(
            livePreviewPath({ collection: 'pages', id: '1', locale: 'en' })
        ).toBe('/live-preview/pages/1?locale=en')
    })

    it('has no path for unsaved documents', () => {
        expect(livePreviewPath({ collection: 'pages' })).toBeUndefined()
    })
})

describe('livePreviewConfig', () => {
    it('enables the preview for the website content', () => {
        expect(livePreviewConfig.collections).toEqual([
            'pages',
            'dogs',
            'litters',
            'gallery',
            'news',
        ])
        expect(livePreviewConfig.globals).toEqual(['home'])
    })

    it('returns an absolute URL on the website origin', () => {
        expect(
            url({
                data: { id: 'abc' },
                collectionConfig: {
                    slug: 'dogs',
                } as UrlArgs['collectionConfig'],
                locale: { code: 'de' } as UrlArgs['locale'],
            })
        ).toBe('https://www.example.com/live-preview/dogs/abc?locale=de')
    })

    it('returns null without document id (no preview yet)', () => {
        expect(
            url({
                data: {},
                collectionConfig: {
                    slug: 'dogs',
                } as UrlArgs['collectionConfig'],
            })
        ).toBeNull()
    })
})
