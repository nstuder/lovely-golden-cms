import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type Props = {
    href?: string | null
    title?: string | null
    image?: Media | string | null
}

/** Linked image with title, used in the dog and litter overviews. */
export const TeaserCard = ({ href, title, image }: Props) => (
    <div className="col-md-6">
        <a
            href={href ?? undefined}
            className="text-decoration-none"
            aria-label={title ?? undefined}
        >
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="shadow image-hover mx-auto d-block w-100"
            />
            <h3>{title}</h3>
        </a>
    </div>
)
