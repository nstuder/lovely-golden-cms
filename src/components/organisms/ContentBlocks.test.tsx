import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media, paragraph, pedigreeParents } from '@/test/fixtures'
import { ContentBlocks, type Block } from './ContentBlocks'

describe('ContentBlocks', () => {
    it('renders every block type in order', () => {
        const content = [
            { id: '1', blockType: 'richtext', content: [paragraph('Text 1')] },
            {
                id: '2',
                blockType: 'text-with-image',
                content: [paragraph('Text 2')],
                image: media('twi'),
                right: true,
            },
            {
                id: '3',
                blockType: 'images',
                images: [{ id: 'i', image: media('grid') }],
            },
            { id: '4', blockType: 'pedigree', ...pedigreeParents },
        ] as Block[]
        const { container } = render(<ContentBlocks content={content} />)

        expect(screen.getByText('Text 1')).toBeInTheDocument()
        expect(screen.getByText('Text 2')).toBeInTheDocument()
        expect(screen.getByRole('img', { name: 'Alt twi' })).toBeInTheDocument()
        expect(
            screen.getByRole('img', { name: 'Alt grid' })
        ).toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
        // one wrapper (spacing), the blocks directly inside it
        expect(container.children).toHaveLength(1)
        expect(container.firstElementChild).toHaveClass('blocks')
        expect(container.firstElementChild?.children).toHaveLength(4)
    })

    it('ignores unknown blocks and empty content', () => {
        const { container } = render(
            <ContentBlocks content={[{ blockType: 'video' } as never]} />
        )
        expect(container).toBeEmptyDOMElement()
        const { container: empty } = render(<ContentBlocks content={null} />)
        expect(empty).toBeEmptyDOMElement()
    })
})
