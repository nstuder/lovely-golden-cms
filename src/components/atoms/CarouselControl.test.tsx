import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CarouselControl } from './CarouselControl'

describe('CarouselControl', () => {
    it.each([
        ['prev', 'Vorheriges Bild'],
        ['next', 'Nächstes Bild'],
    ] as const)('renders the %s button', (direction, label) => {
        render(<CarouselControl target="slides" direction={direction} />)
        const button = screen.getByRole('button', { name: label })
        expect(button).toHaveAttribute('href', '#slides')
        expect(button).toHaveAttribute('data-bs-slide', direction)
        expect(button).toHaveClass(`carousel-control-${direction}`)
    })
})
