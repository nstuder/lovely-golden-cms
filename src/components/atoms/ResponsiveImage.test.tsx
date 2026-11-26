import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { ResponsiveImage } from './ResponsiveImage'

describe('ResponsiveImage', () => {
    it('renders one image, full width on mobile and 75% from md upwards', () => {
        render(<ResponsiveImage image={media('a')} />)
        const img = screen.getByRole('img')
        expect(img).toHaveClass('d-block', 'mx-auto', 'w-100', 'w-md-75')
        expect(img).toHaveAttribute('sizes', '(min-width: 768px) 75vw, 100vw')
    })

    it('takes the rendered width from the caller', () => {
        render(<ResponsiveImage image={media('a')} sizes="25vw" />)
        expect(screen.getByRole('img')).toHaveAttribute('sizes', '25vw')
    })

    it('renders nothing without image', () => {
        const { container } = render(<ResponsiveImage image={null} />)
        expect(container).toBeEmptyDOMElement()
    })
})
