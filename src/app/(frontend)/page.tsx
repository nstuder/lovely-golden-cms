import { RichText } from '@/components/RichText'
import { toLocalDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { getClient, LOCALE } from '@/lib/payload'

export const generateMetadata = () => buildMetadata()

export default async function HomePage() {
    const payload = await getClient()
    const [home, news] = await Promise.all([
        payload.findGlobal({ slug: 'home', locale: LOCALE }),
        payload.find({
            collection: 'news',
            locale: LOCALE,
            limit: 5,
            sort: '-publishedAt',
        }),
    ])

    return (
        <>
            <h1>{home.title}</h1>
            <section className="container">
                <RichText content={home.content} />
                <h3 className="mt-5">Aktuelles</h3>
                {news.docs.map((entry) => (
                    <p className="text-center fs-5 mb-0" key={entry.id}>
                        <a
                            href={entry.link || '/aktuelles'}
                            className="link-dark"
                        >
                            <strong>{toLocalDate(entry.publishedAt)}</strong>{' '}
                            {entry.title}
                        </a>
                    </p>
                ))}
            </section>
        </>
    )
}
