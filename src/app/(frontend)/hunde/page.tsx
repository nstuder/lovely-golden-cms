import { DogsOverviewTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { getClient, LOCALE } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Hunde',
        metaDescription: 'Hunde - Moments of Love',
        pageUrl: `${process.env.BASE_URL}/hunde`,
    })

export default async function DogsPage() {
    const payload = await getClient()
    const { docs: dogs } = await payload.find({
        collection: 'dogs',
        locale: LOCALE,
        pagination: false,
    })

    return <DogsOverviewTemplate dogs={dogs} />
}
