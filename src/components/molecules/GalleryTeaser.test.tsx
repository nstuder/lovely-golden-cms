import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { GalleryTeaser } from './GalleryTeaser'

describe('GalleryTeaser', () => {
    it('links the cover image to the gallery', () => {
        render(
            <GalleryTeaser
                href="/galerie/Welpen"
                title="Welpen"
                image={media('w')}
            />
        )
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/galerie/Welpen'
        )
        expect(
            screen.getByRole('heading', { level: 2, name: 'Welpen' })
        ).toBeInTheDocument()
    })
})
