import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media, paragraph } from '@/test/fixtures'
import { TextWithImage } from './TextWithImage'

const columns = (right: boolean) => {
    const { container } = render(
        <TextWithImage
            content={[paragraph('Text')]}
            image={media('a')}
            right={right}
        />
    )
    return Array.from(container.querySelectorAll('.row > div')).map((col) =>
        col.querySelector('img') ? 'image' : 'text'
    )
}

describe('TextWithImage', () => {
    it('shows the image on the left by default', () => {
        expect(columns(false)).toEqual(['image', 'text'])
    })

    it('shows the image on the right if requested', () => {
        expect(columns(true)).toEqual(['text', 'image'])
    })
})
