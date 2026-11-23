import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { paragraph } from '@/test/fixtures'
import { HomeTemplate } from './HomeTemplate'

describe('HomeTemplate', () => {
    it('shows the intro and the latest news', () => {
        render(
            <HomeTemplate
                home={{ title: 'Willkommen', content: [paragraph('Hallo')] }}
                news={[
                    {
                        id: '1',
                        title: 'Welpen',
                        publishedAt: '2024-05-01T08:00:00Z',
                        link: null,
                    },
                ]}
            />
        )
        expect(
            screen.getByRole('heading', { level: 1, name: 'Willkommen' })
        ).toBeInTheDocument()
        expect(screen.getByText('Hallo')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Welpen/ })).toHaveAttribute(
            'href',
            '/aktuelles'
        )
    })
})
