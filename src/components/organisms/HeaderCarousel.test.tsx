import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { media } from '@/test/fixtures'
import { HeaderCarousel } from './HeaderCarousel'

const images = ['a', 'b', 'c'].map((name) => ({
    id: name,
    image: media(name),
}))

const visibleSlide = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('[aria-hidden]')).findIndex(
        (slide) => slide.getAttribute('aria-hidden') === 'false'
    )

describe('HeaderCarousel', () => {
    afterEach(() => vi.useRealTimers())

    it('loads the first slide right away (LCP), the others lazily', () => {
        render(<HeaderCarousel images={images} />)
        const [first, second, third] = screen.getAllByRole('img', {
            hidden: true,
        })
        expect(first).toHaveAttribute('loading', 'eager')
        expect(first).toHaveAttribute('fetchpriority', 'high')
        expect(second).toHaveAttribute('loading', 'lazy')
        expect(third).toHaveAttribute('loading', 'lazy')
    })

    it('shows the first slide, switches with buttons and dots', () => {
        const { container } = render(<HeaderCarousel images={images} />)
        expect(visibleSlide(container)).toBe(0)
        fireEvent.click(screen.getByRole('button', { name: 'Nächstes Bild' }))
        expect(visibleSlide(container)).toBe(1)
        fireEvent.click(screen.getByRole('button', { name: 'Vorheriges Bild' }))
        fireEvent.click(screen.getByRole('button', { name: 'Vorheriges Bild' }))
        expect(visibleSlide(container)).toBe(2)
        fireEvent.click(screen.getByRole('button', { name: 'Bild 2' }))
        expect(visibleSlide(container)).toBe(1)
        expect(screen.getByRole('button', { name: 'Bild 2' })).toHaveAttribute(
            'aria-current',
            'true'
        )
    })

    it('advances on its own, but not while hovered', () => {
        vi.useFakeTimers()
        const { container } = render(<HeaderCarousel images={images} />)
        act(() => vi.advanceTimersByTime(6000))
        expect(visibleSlide(container)).toBe(1)
        fireEvent.mouseEnter(screen.getByRole('banner'))
        act(() => vi.advanceTimersByTime(12000))
        expect(visibleSlide(container)).toBe(1)
    })

    it('has no controls for a single image', () => {
        render(<HeaderCarousel images={images.slice(0, 1)} />)
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
})
