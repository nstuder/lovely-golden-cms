// @vitest-environment node
import { revalidateTag } from 'next/cache'
import type { CollectionConfig, GlobalConfig, PayloadRequest } from 'payload'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import config from './payload.config'
import {
    CMS_CACHE_TAG,
    clearWebsiteCache,
    withCollectionRevalidation,
    withGlobalRevalidation,
} from './revalidate'

const warn = vi.fn()
const req = { payload: { logger: { warn } } } as unknown as PayloadRequest

describe('website cache', () => {
    beforeEach(() => {
        vi.mocked(revalidateTag).mockReset()
        warn.mockReset()
    })

    it('expires all cached website queries right away', () => {
        clearWebsiteCache(req)
        expect(revalidateTag).toHaveBeenCalledWith(CMS_CACHE_TAG, {
            expire: 0,
        })
    })

    it('only warns outside of a Next.js request', () => {
        vi.mocked(revalidateTag).mockImplementation(() => {
            throw new Error('static generation store missing')
        })
        expect(() => clearWebsiteCache(req)).not.toThrow()
        expect(warn).toHaveBeenCalled()
    })

    it('keeps existing hooks and returns the document', async () => {
        const own = vi.fn()
        const collection = withCollectionRevalidation({
            slug: 'x',
            fields: [],
            hooks: { afterChange: [own] },
        } as CollectionConfig)
        const [first, ours] = collection.hooks?.afterChange ?? []
        expect(first).toBe(own)
        const doc = { id: '1' }
        expect(await ours({ doc, req } as never)).toBe(doc)
        expect(collection.hooks?.afterDelete).toHaveLength(1)
        expect(revalidateTag).toHaveBeenCalled()

        const global = withGlobalRevalidation({
            slug: 'g',
            fields: [],
        } as GlobalConfig)
        expect(global.hooks?.afterChange).toHaveLength(1)
    })

    it('is used by everything on the website, not by the users', async () => {
        const built = await config
        const hasHook = (hooks?: { afterChange?: unknown[] }) =>
            (hooks?.afterChange?.length ?? 0) > 0
        expect(
            built.collections
                .filter((c) => hasHook(c.hooks))
                .map((c) => c.slug)
                .sort()
        ).toEqual(['dogs', 'gallery', 'litters', 'media', 'news', 'pages'])
        expect(built.globals.every((g) => hasHook(g.hooks))).toBe(true)
    })
})
