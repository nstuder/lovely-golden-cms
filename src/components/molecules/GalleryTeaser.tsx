import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type Props = {
    href: string
    title?: string | null
    image?: Media | string | null
}

/** Linked cover image of a gallery (gallery overview). */
export const GalleryTeaser = ({ href, title, image }: Props) => (
    <a className="group block text-center" href={href}>
        <div className="overflow-hidden rounded-xl shadow-lg transition-shadow group-hover:shadow-2xl">
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <h2>{title}</h2>
    </a>
)
