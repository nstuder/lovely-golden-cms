import { Image } from '@/components/Image'
import { buildMetadata } from '@/lib/metadata'
import { getClient, LOCALE } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Galerie',
        metaDescription: 'Galerie',
        pageUrl: `${process.env.BASE_URL}/galerie`,
    })

export default async function GalleriesPage() {
    const payload = await getClient()
    const { docs: galleries } = await payload.find({
        collection: 'gallery',
        locale: LOCALE,
        pagination: false,
    })

    return (
        <>
            <h1>Galerie</h1>
            <section className="container-fluid">
                <div className="row justify-content-center">
                    {galleries.map((gallery) => (
                        <a
                            key={gallery.id}
                            className="col-md-6 block text-center text-decoration-none"
                            href={`/galerie/${gallery.name}`}
                        >
                            <Image
                                image={gallery.gallery?.[0]?.image}
                                className="shadow image-hover"
                            />
                            <h2>{gallery.name}</h2>
                        </a>
                    ))}
                </div>
            </section>
        </>
    )
}
