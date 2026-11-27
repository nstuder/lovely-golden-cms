import type { Gallery } from '@/cms/payload-types'
import { GalleryTeaser } from '@/components/molecules'

type GalleryTeaserData = Pick<Gallery, 'id' | 'name' | 'gallery'>

/** /galerie: one teaser per gallery, showing its first image. */
export const GalleriesOverviewTemplate = ({
    galleries,
}: {
    galleries: GalleryTeaserData[]
}) => (
    <section className="container-wide">
        <h1>Galerie</h1>
        <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {galleries.map((gallery) => (
                <GalleryTeaser
                    key={gallery.id}
                    href={`/galerie/${gallery.name}`}
                    title={gallery.name}
                    image={gallery.gallery?.[0]?.image}
                />
            ))}
        </div>
    </section>
)
