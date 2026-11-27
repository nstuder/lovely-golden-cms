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
        className="group block overflow-hidden rounded-xl bg-white/70 shadow-lg transition-shadow group-hover:shadow-2xl"
        aria-label={title ?? undefined}
    >
        <div className="overflow-hidden">
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="block w-full transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <h3 className="my-0 px-4 py-4">{title}</h3>
    </a>
)
