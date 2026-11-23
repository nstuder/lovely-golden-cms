import { Image } from '@/components/Image'
import { buildMetadata } from '@/lib/metadata'
import { getClient, LOCALE } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Würfe',
        metaDescription: 'Würfe - Moments of Love',
        pageUrl: `${process.env.BASE_URL}/wuerfe`,
    })

export default async function LittersPage() {
    const payload = await getClient()
    const { docs: litters } = await payload.find({
        collection: 'litters',
        locale: LOCALE,
        pagination: false,
    })

    return (
        <section className="container">
            <h1>Würfe</h1>
            <div className="row text-center justify-content-center">
                {litters.map((litter) => (
                    <div className="col-md-6" key={litter.id}>
                        <a
                            href={litter.slug}
                            className="text-decoration-none"
                            aria-label={litter.name ?? undefined}
                        >
                            <Image
                                image={litter.collage}
                                className="shadow image-hover mx-auto d-block w-100"
                            />
                            <h3>{litter.name}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}
