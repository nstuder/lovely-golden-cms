import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { paginated, payloadMock } from '@/test/payloadMock'

vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', async () => ({
    getPayload: async () => (await import('@/test/payloadMock')).payloadMock,
}))

const { NewsPage, NEWS_LIMIT } = await import('./NewsPage')

const entries = [{ id: '1', title: 'Neuigkeit', publishedAt: null }]

describe('NewsPage', () => {
    beforeEach(() => payloadMock.find.mockReset())

    it('loads the newest entries of the requested page', async () => {
        payloadMock.find.mockResolvedValue(
            paginated(entries, { page: 2, totalPages: 3 })
        )
        render(await NewsPage({ page: 2 }))
        expect(payloadMock.find).toHaveBeenCalledWith({
            collection: 'news',
            locale: 'de',
            sort: '-publishedAt',
            page: 2,
            limit: NEWS_LIMIT,
        })
        expect(screen.getByRole('article')).toHaveTextContent('Neuigkeit')
        expect(screen.getByRole('link', { name: 'Seite 2' })).toHaveAttribute(
            'aria-current',
            'true'
        )
        expect(
            screen.getByRole('link', { name: 'Vorherige Seite' })
        ).toHaveAttribute('href', '/aktuelles/1')
    })

    it('does not highlight a page on /aktuelles (like before)', async () => {
        payloadMock.find.mockResolvedValue(
            paginated(entries, { page: 1, totalPages: 2 })
        )
        render(await NewsPage({}))
        expect(payloadMock.find).toHaveBeenCalledWith(
            expect.objectContaining({ page: 1 })
        )
        expect(screen.getByRole('link', { name: 'Seite 1' })).toHaveAttribute(
            'aria-current',
            'false'
        )
    })
})
