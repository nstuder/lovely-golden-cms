import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

type ImageItem = {
    image?: Media | string | null
    altAsCaption?: boolean | null
    id?: string | null
}

/** Two-column image grid, optionally with the alt text as caption ("images" block). */
export const ImageGrid = ({ images }: { images?: ImageItem[] | null }) => (
    <div className="row justify-content-center align-items-center">
        {images?.map((item, i) => (
            <div className="col-lg-6" key={item.id ?? i}>
                <figure className="figure">
                    <Image image={item.image} className="shadow" />
                    {item.altAsCaption &&
                        item.image &&
                        typeof item.image === 'object' && (
                            <figcaption className="figure-caption text-center mt-2">
                                {item.image.alt}
                            </figcaption>
                        )}
                </figure>
            </div>
        ))}
    </div>
)
