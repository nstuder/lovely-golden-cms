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
        expect(img).toHaveClass('h-auto', 'max-w-full', 'shadow')
        expect(img).toHaveAttribute(
            'srcset',
            '/api/media/file/summer-small.jpg 400w, /api/media/file/summer-medium.jpg 800w'
        )
    })

    it('assumes full viewport width unless the caller knows better', () => {
        const { rerender } = render(<Image image={media('a')} />)
        expect(screen.getByRole('img')).toHaveAttribute('sizes', '100vw')
        rerender(<Image image={media('a')} sizes="50vw" />)
        expect(screen.getByRole('img')).toHaveAttribute('sizes', '50vw')
    })

    it('loads priority images (first header slide) right away', () => {
        render(<Image image={media('a')} priority />)
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('loading', 'eager')
        expect(img).toHaveAttribute('fetchpriority', 'high')
    })

    it('skips sizes without url and omits an empty srcset', () => {
        render(
            <Image image={media('x', { sizes: { small: { url: null } } })} />
        )
        const img = screen.getByRole('img')
        expect(img).not.toHaveAttribute('srcset')
        expect(img).not.toHaveAttribute('sizes')
    })

    it('renders nothing for missing or unpopulated uploads', () => {
        const { container: a } = render(<Image image={null} />)
        const { container: b } = render(<Image image="6512abcdef" />)
        expect(a).toBeEmptyDOMElement()
        expect(b).toBeEmptyDOMElement()
    })
})
