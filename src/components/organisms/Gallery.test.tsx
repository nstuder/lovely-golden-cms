import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { Gallery } from './Gallery'

describe('Gallery', () => {
    const images = ['a', 'b', 'c'].map((name) => ({
        id: name,
        image: media(name),
    }))

    it('renders a thumbnail per image that opens the carousel at that slide', () => {
        const { container } = render(<Gallery images={images} />)
        const triggers = container.querySelectorAll(
            '[data-bs-toggle="modal"] [data-bs-slide-to]'
        )
        expect(
            Array.from(triggers).map((el) =>
                el.getAttribute('data-bs-slide-to')
            )
        ).toEqual(['0', '1', '2'])
    })

    it('renders the fullscreen carousel with the first slide active', () => {
        const { container } = render(<Gallery images={images} />)
        const modal = container.querySelector('#modal_gallery')
        const slides = modal?.querySelectorAll('.carousel-item') ?? []
        expect(slides).toHaveLength(3)
        expect(slides[0]).toHaveClass('active', 'carousel-item-modal')
        expect(slides[2]).not.toHaveClass('active')
        expect(modal?.querySelectorAll('.carousel-indicators li')).toHaveLength(
            3
        )
    })

    it('renders an empty modal without images', () => {
        const { container } = render(<Gallery images={null} />)
        expect(container.querySelectorAll('img')).toHaveLength(0)
        expect(container.querySelector('#carousel_gallery')).not.toBeNull()
    })
})
