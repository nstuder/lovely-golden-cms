// @vitest-environment node
import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'
import Media, { setMediaCacheHeaders } from './Media'
import Users from './Users'

const req = (user: unknown) => ({ req: { user } as PayloadRequest })

describe('Users access', () => {
    const read = Users.access?.read as (args: unknown) => boolean

    it('is not public (emails and sessions)', () => {
        expect(read(req(null))).toBe(false)
    })

    it('is readable for logged in admins', () => {
        expect(read(req({ id: '1', email: 'admin@example.com' }))).toBe(true)
    })
})

describe('Media', () => {
    it('is public, the website shows the images', () => {
        expect((Media.access?.read as () => boolean)()).toBe(true)
    })

    it('lets browsers cache uploads', () => {
        const headers = setMediaCacheHeaders(
            new Headers({ 'Content-Type': 'image/webp' })
        )
        expect(headers.get('Cache-Control')).toBe(
            'public, max-age=604800, stale-while-revalidate=86400'
        )
        expect(headers.get('Content-Type')).toBe('image/webp')
    })

    it('uses the cache headers for file responses', () => {
        expect(
            typeof Media.upload === 'object' &&
                Media.upload.modifyResponseHeaders
        ).toBeTypeOf('function')
    })
})
