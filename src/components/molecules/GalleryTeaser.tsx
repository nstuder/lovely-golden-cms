import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type Props = {
    href: string
    title?: string | null
    image?: Media | string | null
}

/** Linked cover image of a gallery (gallery overview). */
export const GalleryTeaser = ({ href, title, image }: Props) => (
    <a
        className="group block overflow-hidden rounded-xl bg-white/70 text-center shadow-lg transition-shadow group-hover:shadow-2xl"
        href={href}
    >
        <div className="overflow-hidden">
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="block w-full transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <h2 className="my-0 px-4 py-4">{title}</h2>
    </a>
)
