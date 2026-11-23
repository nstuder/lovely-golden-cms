import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { ImageGrid } from './ImageGrid'

describe('ImageGrid', () => {
    it('renders all images, captions only where requested', () => {
        const { container } = render(
            <ImageGrid
                images={[
                    { id: '1', image: media('a'), altAsCaption: true },
                    { id: '2', image: media('b'), altAsCaption: false },
                ]}
            />
        )
        expect(screen.getAllByRole('img')).toHaveLength(2)
        const captions = container.querySelectorAll('figcaption')
        expect(captions).toHaveLength(1)
        expect(captions[0]).toHaveTextContent('Alt a')
    })

    it('has no caption for unpopulated images', () => {
        const { container } = render(
            <ImageGrid images={[{ image: 'id', altAsCaption: true }]} />
        )
        expect(container.querySelector('figcaption')).toBeNull()
    })
})
