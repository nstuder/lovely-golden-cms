import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type ImageItem = {
    image?: Media | string | null
    altAsCaption?: boolean | null
    id?: string | null
}

/** Two-column image grid, optionally with the alt text as caption ("images" block). */
export const ImageGrid = ({ images }: { images?: ImageItem[] | null }) => (
    <div className="my-6 flex flex-wrap items-center justify-center gap-y-6">
        {images?.map((item, i) => (
            <figure className="w-full px-3 lg:w-1/2" key={item.id ?? i}>
                <Image
                    image={item.image}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="mx-auto rounded-lg shadow-lg"
                />
                {item.altAsCaption &&
                    item.image &&
                    typeof item.image === 'object' && (
                        <figcaption className="mt-2 text-center">
                            {item.image.alt}
                        </figcaption>
                    )}
            </figure>
        ))}
    </div>
)
