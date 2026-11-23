import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CarouselIndicators } from './CarouselIndicators'

describe('CarouselIndicators', () => {
    it('renders one indicator per slide, the first is active', () => {
        const { container } = render(
            <CarouselIndicators
                target="slides"
                keys={['a', 'b', 'c']}
                className="d-none"
            />
        )
        const list = container.querySelector('ol')
        expect(list).toHaveClass('carousel-indicators', 'd-none')
        const items = container.querySelectorAll('li')
        expect(items).toHaveLength(3)
        expect(items[0]).toHaveClass('active')
        expect(items[1]).not.toHaveClass('active')
        expect(items[2]).toHaveAttribute('data-bs-slide-to', '2')
        expect(items[2]).toHaveAttribute('data-bs-target', '#slides')
    })
})
