import type { Gallery as GalleryData } from '@/cms/payload-types'
import { Gallery } from '@/components/organisms'

/** /galerie/<name>: one gallery. */
export const GalleryDetailTemplate = ({
    gallery,
}: {
    gallery: Pick<GalleryData, 'name' | 'gallery'>
}) => (
    <section className="container-fluid">
        <h1>{gallery.name}</h1>
        <Gallery images={gallery.gallery} />
    </section>
)
