import type { Media } from '@/cms/payload-types'

type Props = {
    image?: Media | string | null
    className?: string
    /**
     * Rendered width of the image (`sizes` attribute), so the browser picks
     * the smallest fitting file from the srcset. Default: full viewport width.
     */
    sizes?: string
    /** Above the fold (largest visible image): load right away with high priority. */
    priority?: boolean
}

const SIZES = ['small', 'medium', 'large', 'extraLarge'] as const

/** Responsive image with srcset of all generated sizes (atoms/image.hbs). */
export const Image = ({ image, className, sizes, priority }: Props) => {
    // Not populated (missing/deleted upload) -> nothing to render
    if (!image || typeof image !== 'object') return null

    const srcSet = SIZES.map((size) => image.sizes?.[size])
        .filter((size): size is NonNullable<typeof size> => Boolean(size?.url))
        .map((size) => `${size.url} ${size.width}w`)
        .join(', ')

    return (
        <img
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            src={image.url ?? undefined}
            alt={image.alt ?? ''}
            title={image.alt ?? undefined}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            className={['img-fluid', className].filter(Boolean).join(' ')}
            srcSet={srcSet || undefined}
            sizes={srcSet ? (sizes ?? '100vw') : undefined}
        />
    )
}
