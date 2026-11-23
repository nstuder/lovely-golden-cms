import type { Media } from '@/cms/payload-types'

type Props = {
    image?: Media | string | null
    className?: string
}

const SIZES = ['small', 'medium', 'large', 'extraLarge'] as const

/** Responsive image with srcset of all generated sizes (atoms/image.hbs). */
export const Image = ({ image, className }: Props) => {
    // Not populated (missing/deleted upload) -> nothing to render
    if (!image || typeof image !== 'object') return null

    const srcSet = SIZES.map((size) => image.sizes?.[size])
        .filter((size) => size?.url)
        .map((size) => `${size.url} ${size.width}w`)
        .join(', ')

    return (
        <img
            loading="lazy"
            src={image.url ?? undefined}
            alt={image.alt ?? ''}
            title={image.alt ?? undefined}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            className={['img-fluid', className].filter(Boolean).join(' ')}
            srcSet={srcSet || undefined}
        />
    )
}
