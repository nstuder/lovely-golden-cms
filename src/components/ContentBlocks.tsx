import { Fragment } from 'react'
import type { Media, Page } from '@/cms/payload-types'
import { Image } from './Image'
import { Pedigree } from './Pedigree'
import { RichText } from './RichText'

type Block = NonNullable<Page['content']>[number]

type ImageItem = {
    image?: Media | string | null
    altAsCaption?: boolean | null
    id?: string | null
}

export const Images = ({ images }: { images?: ImageItem[] | null }) => (
    <div className="row justify-content-center align-items-center">
        {images?.map((item, i) => (
            <div className="col-lg-6" key={item.id ?? i}>
                <figure className="figure">
                    <Image image={item.image} className="shadow" />
                    {item.altAsCaption &&
                        item.image &&
                        typeof item.image === 'object' && (
                            <figcaption className="figure-caption text-center mt-2">
                                {item.image.alt}
                            </figcaption>
                        )}
                </figure>
            </div>
        ))}
    </div>
)

const TextWithImage = ({
    content,
    image,
    right,
}: {
    content: unknown
    image?: Media | string | null
    right?: boolean | null
}) => {
    const text = (
        <div className="col-md-6 my-auto">
            <RichText content={content} />
        </div>
    )
    const img = (
        <div className="col-md-6 py-2 my-auto">
            <Image image={image} className="shadow mx-auto" />
        </div>
    )
    return (
        <div className="row">
            {right ? (
                <>
                    {text}
                    {img}
                </>
            ) : (
                <>
                    {img}
                    {text}
                </>
            )}
        </div>
    )
}

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
            return <Images images={block.images} />
        default:
            return null
    }
}

/** Renders the `content` blocks field (content-block.hbs). */
export const ContentBlocks = ({ content }: { content?: Block[] | null }) => (
    <>
        {content?.map((block, i) => (
            <Fragment key={block.id ?? i}>{renderBlock(block)}</Fragment>
        ))}
    </>
)
