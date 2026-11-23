// @vitest-environment node
import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { proxy } from './proxy'

const request = (url: string) =>
    new NextRequest(url, { headers: { host: new URL(url).host } })

describe('proxy', () => {
    afterEach(() => vi.unstubAllEnvs())

    it('redirects the bare domain to www in production', () => {
        vi.stubEnv('NODE_ENV', 'production')
        const response = proxy(request('https://lovely-golden.de/hunde?x=1'))
        expect(response.status).toBe(301)
        expect(response.headers.get('location')).toBe(
            'https://www.lovely-golden.de/hunde?x=1'
        )
    })

    it('passes www requests through', () => {
        vi.stubEnv('NODE_ENV', 'production')
        const response = proxy(request('https://www.lovely-golden.de/hunde'))
        expect(response.headers.get('location')).toBeNull()
        expect(response.headers.get('x-middleware-next')).toBe('1')
    })

    it('does not redirect during development', () => {
        vi.stubEnv('NODE_ENV', 'development')
        const response = proxy(request('http://localhost:3000/'))
        expect(response.headers.get('location')).toBeNull()
    })
})
