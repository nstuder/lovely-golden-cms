import type { Media } from '@/cms/payload-types'
import { Image } from './Image'

type Props = { image?: Media | string | null }

/**
 * The same image twice: 75% wide from `md` upwards, full width on mobile
 * (used for uploads in rich text and the parent images of a pedigree).
 */
export const ResponsiveImage = ({ image }: Props) => (
    <>
        <Image
            image={image}
            className="shadow mx-auto d-none d-md-block w-75"
        />
        <Image
            image={image}
            className="shadow mx-auto d-block d-md-none w-100"
        />
    </>
)
