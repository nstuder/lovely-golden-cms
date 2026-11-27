import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media, paragraph } from '@/test/fixtures'
import { TextWithImage } from './TextWithImage'

const imageColumn = (right?: boolean) => {
    const { container } = render(
        <TextWithImage
            content={[paragraph('Text')]}
            image={media('a')}
            right={right}
        />
    )
    expect(screen.getByText('Text')).toBeInTheDocument()
    return container.querySelector('img')?.parentElement
}

describe('TextWithImage', () => {
    it('shows the image on the left by default (first on mobile)', () => {
        expect(imageColumn(false)).not.toHaveClass('md:order-2')
    })

    it('shows the image on the right if requested', () => {
        expect(imageColumn(true)).toHaveClass('md:order-2')
    })
})
