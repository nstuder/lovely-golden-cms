import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { HeaderCarousel } from './HeaderCarousel'

describe('HeaderCarousel', () => {
    const images = ['a', 'b', 'c'].map((name) => ({
        id: name,
        image: media(name),
    }))

    it('loads the first slide right away (LCP), the others lazily', () => {
        render(<HeaderCarousel images={images} />)
        const [first, second, third] = screen.getAllByRole('img')
        expect(first).toHaveAttribute('loading', 'eager')
        expect(first).toHaveAttribute('fetchpriority', 'high')
        expect(second).toHaveAttribute('loading', 'lazy')
        expect(third).toHaveAttribute('loading', 'lazy')
    })

    it('marks only the first slide as active', () => {
        const { container } = render(<HeaderCarousel images={images} />)
        const slides = container.querySelectorAll('.carousel-item')
        expect(slides[0]).toHaveClass('active')
        expect(slides[1]).not.toHaveClass('active')
    })
})
