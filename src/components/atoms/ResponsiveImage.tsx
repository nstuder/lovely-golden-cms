import type { Media } from '@/cms/payload-types'
import { Image } from './Image'

type Props = {
    image?: Media | string | null
    /** rendered width, see Image (default: 75% from `md` upwards, full width on mobile) */
    sizes?: string
}

/**
 * Centered image, 75% wide from `md` upwards and full width on mobile
 * (used for uploads in rich text and the parent images of a pedigree).
 */
export const ResponsiveImage = ({
    image,
    sizes = '(min-width: 768px) 75vw, 100vw',
}: Props) => (
    <Image
        image={image}
        sizes={sizes}
        className="shadow mx-auto d-block w-100 w-md-75"
    />
)
