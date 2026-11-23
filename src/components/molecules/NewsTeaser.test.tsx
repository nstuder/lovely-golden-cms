import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NewsTeaser } from './NewsTeaser'

describe('NewsTeaser', () => {
    it('shows date and title, linking to /aktuelles by default', () => {
        render(
            <NewsTeaser
                title="Welpen sind da"
                publishedAt="2024-05-01T08:00:00Z"
            />
        )
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/aktuelles')
        expect(link).toHaveTextContent('1.5.2024 Welpen sind da')
    })

    it('uses a custom link if set', () => {
        render(<NewsTeaser title="A-Wurf" link="/wuerfe/a-wurf" />)
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/wuerfe/a-wurf'
        )
    })
})
