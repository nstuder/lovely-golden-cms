import type { Dog } from '@/cms/payload-types'
import { Image } from '@/components/Image'
import { buildMetadata } from '@/lib/metadata'
import { getClient, LOCALE } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Hunde',
        metaDescription: 'Hunde - Moments of Love',
        pageUrl: `${process.env.BASE_URL}/hunde`,
    })

const CATEGORIES: { type: Dog['type']; title: string }[] = [
    { type: 'rzucht', title: 'Zuchtrüden' },
    { type: 'fzucht', title: 'Zuchthündinnen' },
    { type: 'young', title: 'Youngster' },
    { type: 'retirement', title: 'Im Ruhestand' },
    { type: 'dead', title: 'In Memoriam' },
]

export default async function DogsPage() {
    const payload = await getClient()
    const { docs: dogs } = await payload.find({
        collection: 'dogs',
        locale: LOCALE,
        pagination: false,
    })

    return (
        <section className="container">
            <h1>Unsere Hunde</h1>
            <div className="row text-center justify-content-center">
                {CATEGORIES.map(({ type, title }) => {
                    const inCategory = dogs.filter((dog) => dog.type === type)
                    if (!inCategory.length) return null
                    return [
                        <h2 className="col-12 mt-5" key={type}>
                            {title}
                        </h2>,
                        ...inCategory.map((dog) => (
                            <div className="col-md-6" key={dog.id}>
                                <a
                                    href={dog.slug}
                                    className="text-decoration-none"
                                    aria-label={dog.name}
                                >
                                    <Image
                                        image={dog.teaserImage}
                                        className="shadow image-hover mx-auto d-block w-100"
                                    />
                                    <h3>{dog.name}</h3>
                                </a>
                            </div>
                        )),
                    ]
                })}
            </div>
        </section>
    )
}
