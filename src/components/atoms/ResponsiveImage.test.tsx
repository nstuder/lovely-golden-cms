import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { ResponsiveImage } from './ResponsiveImage'

describe('ResponsiveImage', () => {
    it('renders a desktop and a mobile variant', () => {
        render(<ResponsiveImage image={media('a')} />)
        const [desktop, mobile] = screen.getAllByRole('img')
        expect(desktop).toHaveClass('d-none', 'd-md-block', 'w-75')
        expect(mobile).toHaveClass('d-block', 'd-md-none', 'w-100')
    })

    it('renders nothing without image', () => {
        const { container } = render(<ResponsiveImage image={null} />)
        expect(container).toBeEmptyDOMElement()
    })
})
