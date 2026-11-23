import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { Image } from './Image'

describe('Image', () => {
    it('renders a lazy responsive image with alt text and srcset', () => {
        render(<Image image={media('summer')} className="shadow" />)
        const img = screen.getByRole('img', { name: 'Alt summer' })
        expect(img).toHaveAttribute('src', '/api/media/file/summer.jpg')
        expect(img).toHaveAttribute('loading', 'lazy')
        expect(img).toHaveAttribute('title', 'Alt summer')
        expect(img).toHaveAttribute('width', '1200')
        expect(img).toHaveAttribute('height', '800')
        expect(img).toHaveClass('img-fluid', 'shadow')
        expect(img).toHaveAttribute(
            'srcset',
            '/api/media/file/summer-small.jpg 400w, /api/media/file/summer-medium.jpg 800w'
        )
    })

    it('skips sizes without url and omits an empty srcset', () => {
        render(
            <Image image={media('x', { sizes: { small: { url: null } } })} />
        )
        expect(screen.getByRole('img')).not.toHaveAttribute('srcset')
    })

    it('renders nothing for missing or unpopulated uploads', () => {
        const { container: a } = render(<Image image={null} />)
        const { container: b } = render(<Image image="6512abcdef" />)
        expect(a).toBeEmptyDOMElement()
        expect(b).toBeEmptyDOMElement()
    })
})
