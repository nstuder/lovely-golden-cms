import { HomeTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { find, findGlobal } from '@/lib/payload'

export const generateMetadata = () => buildMetadata()

export default async function HomePage() {
    const [home, news] = await Promise.all([
        findGlobal('home'),
        find({ collection: 'news', limit: 5, sort: '-publishedAt' }),
    ])

    return <HomeTemplate home={home} news={news.docs} />
}
