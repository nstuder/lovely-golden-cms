import { Fragment } from 'react'
import type { Page } from '@/cms/payload-types'
import { ImageGrid, RichText, TextWithImage } from '@/components/molecules'
import { Pedigree } from './Pedigree'

export type Block = NonNullable<Page['content']>[number]

const renderBlock = (block: Block) => {
    switch (block.blockType) {
        case 'richtext':
            return <RichText content={block.content} />
        case 'pedigree':
            return <Pedigree father={block.father} mother={block.mother} />
        case 'text-with-image':
            return (
                <TextWithImage
                    content={block.content}
                    image={block.image}
                    right={block.right}
                />
            )
        case 'images':
            return <ImageGrid images={block.images} />
        default:
            return null
    }
}

/** Renders the `content` blocks field (content-block.hbs). */
export const ContentBlocks = ({ content }: { content?: Block[] | null }) => {
    const rendered = (content ?? [])
        .map((block, i) => [block.id ?? i, renderBlock(block)] as const)
        .filter(([, element]) => element !== null)
    if (!rendered.length) return null
    // wrapper only for the spacing between the blocks (utility `blocks`)
    return (
        <div className="blocks">
            {rendered.map(([key, element]) => (
                <Fragment key={key}>{element}</Fragment>
            ))}
        </div>
    )
}
