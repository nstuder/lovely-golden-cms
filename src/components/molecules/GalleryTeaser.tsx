import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type Props = {
    href: string
    title?: string | null
    image?: Media | string | null
}

/** Linked cover image of a gallery (gallery overview). */
export const GalleryTeaser = ({ href, title, image }: Props) => (
    <a className="col-md-6 block text-center text-decoration-none" href={href}>
        <Image
            image={image}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="shadow image-hover"
        />
        <h2>{title}</h2>
    </a>
)
