import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { GalleryDetailTemplate } from './GalleryDetailTemplate'

describe('GalleryDetailTemplate', () => {
    it('shows the gallery name and images', () => {
        render(
            <GalleryDetailTemplate
                gallery={{
                    name: 'Welpen',
                    gallery: [{ id: 'a', image: media('a') }],
                }}
            />
        )
        expect(
            screen.getByRole('heading', { level: 1, name: 'Welpen' })
        ).toBeInTheDocument()
        // thumbnail for desktop + mobile
        expect(screen.getAllByRole('img', { name: 'Alt a' })).toHaveLength(2)
        // + slide in the (hidden) fullscreen carousel
        expect(
            screen.getAllByRole('img', { name: 'Alt a', hidden: true })
        ).toHaveLength(3)
    })
})
