import { HomeTemplate } from '@/components/templates'
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

    return <HomeTemplate home={home} news={news.docs} />
}
