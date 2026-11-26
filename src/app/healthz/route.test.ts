// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'

const ping = vi.fn()
vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', () => ({
    getPayload: async () => ({
        db: { connection: { db: { admin: () => ({ ping }) } } },
    }),
}))

const { GET } = await import('./route')

describe('/healthz', () => {
    it('is ok when MongoDB answers', async () => {
        ping.mockResolvedValueOnce({ ok: 1 })
        const response = await GET()
        expect(response.status).toBe(200)
        expect(await response.json()).toEqual({ ok: true })
    })

    it('is unhealthy without database', async () => {
        ping.mockRejectedValueOnce(new Error('connection closed'))
        expect((await GET()).status).toBe(503)
    })
})
