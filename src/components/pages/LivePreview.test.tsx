import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Page } from '@/cms/payload-types'
import { dog, paragraph } from '@/test/fixtures'
import { LivePreview } from './LivePreview'

const page: Page = {
    id: 'page-1',
    title: 'Kontakt',
    slug: '/kontakt',
    content: [
        { id: 'b', blockType: 'richtext', content: [paragraph('Ruft an')] },
    ],
    updatedAt: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
}

/** Message as the admin sends it while the document is edited. */
const sendFromAdmin = (data: unknown, origin = window.location.origin) =>
    act(async () => {
        window.dispatchEvent(
            new MessageEvent('message', {
                origin,
                data: {
                    type: 'payload-live-preview',
                    collectionSlug: 'pages',
                    data,
                    locale: 'de',
                },
            })
        )
    })

describe('LivePreview', () => {
    const fetchMock = vi.fn()

    beforeEach(() => {
        fetchMock.mockReset()
        vi.stubGlobal('fetch', fetchMock)
    })
    afterEach(() => vi.unstubAllGlobals())

    it('renders the document with the website template', () => {
        render(<LivePreview type="pages" initialData={page} />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'Kontakt' })
        ).toBeInTheDocument()
        expect(screen.getByText('Ruft an')).toBeInTheDocument()
    })

    it('updates while the document is edited in the admin', async () => {
        fetchMock.mockResolvedValue(
            new Response(JSON.stringify({ ...page, title: 'Kontakt (neu)' }))
        )
        render(<LivePreview type="pages" initialData={page} />)

        await sendFromAdmin({ title: 'Kontakt (neu)' })

        await waitFor(() =>
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
                'Kontakt (neu)'
            )
        )
        // relationships (e.g. images) are populated by the Payload API
        const [url, init] = fetchMock.mock.calls[0]
        expect(url).toBe(`${window.location.origin}/api/pages/page-1`)
        expect(init).toMatchObject({
            method: 'POST',
            credentials: 'include',
            headers: { 'X-Payload-HTTP-Method-Override': 'GET' },
        })
        expect(JSON.parse(init.body)).toMatchObject({
            data: { title: 'Kontakt (neu)' },
            depth: 2,
            locale: 'de',
        })
    })

    it('ignores messages from other origins', async () => {
        render(<LivePreview type="pages" initialData={page} />)
        await sendFromAdmin({ title: 'Böse' }, 'https://evil.example')
        expect(fetchMock).not.toHaveBeenCalled()
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'Kontakt'
        )
    })

    it('uses the matching template per collection', () => {
        render(<LivePreview type="dogs" initialData={dog()} />)
        expect(
            screen.getByRole('heading', { level: 2, name: 'Summer of Love' })
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Ahnentafel' })).toBeVisible()
    })

    it('shows the home page with the latest news', () => {
        render(
            <LivePreview
                type="home"
                initialData={{ id: 'home', title: 'Willkommen' }}
                news={[{ id: 'n', title: 'Welpen', publishedAt: null }]}
            />
        )
        expect(
            screen.getByRole('heading', { level: 1, name: 'Willkommen' })
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Welpen/ })).toBeVisible()
    })
})
