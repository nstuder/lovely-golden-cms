import { vi } from 'vitest'

/**
 * Stand-ins for the Payload local API. Use together with
 *
 *   vi.mock('@payload-config', () => ({ default: {} }))
 *   vi.mock('payload', () => ({ getPayload: async () => payloadMock }))
 *
 * so that the real data helpers in `src/lib` run without a database.
 */
export const payloadMock = {
    auth: vi.fn(),
    find: vi.fn(),
    findByID: vi.fn(),
    findGlobal: vi.fn(),
}

/** Paginated result like `payload.find` returns it. */
export const paginated = <T>(
    docs: T[],
    { page = 1, totalPages = 1 }: { page?: number; totalPages?: number } = {}
) => ({
    docs,
    page,
    totalPages,
    totalDocs: docs.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
})
