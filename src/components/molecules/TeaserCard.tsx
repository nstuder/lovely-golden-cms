import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type Props = {
    href?: string | null
    title?: string | null
    image?: Media | string | null
}

/** Linked image with title, used in the dog and litter overviews. */
export const TeaserCard = ({ href, title, image }: Props) => (
    <a
        href={href ?? undefined}
        className="group block"
        aria-label={title ?? undefined}
    >
        <div className="overflow-hidden rounded-xl shadow-lg transition-shadow group-hover:shadow-2xl">
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="block w-full transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <h3>{title}</h3>
    </a>
)
