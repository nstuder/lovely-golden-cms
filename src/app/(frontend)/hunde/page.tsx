import { DogsOverviewTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { find } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Hunde',
        metaDescription: 'Hunde - Moments of Love',
        pageUrl: `${process.env.BASE_URL}/hunde`,
    })

export default async function DogsPage() {
    const { docs: dogs } = await find({
        collection: 'dogs',
        pagination: false,
    })

    return <DogsOverviewTemplate dogs={dogs} />
}
