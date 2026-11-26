import { LittersOverviewTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { find } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Würfe',
        metaDescription: 'Würfe - Moments of Love',
        pageUrl: `${process.env.BASE_URL}/wuerfe`,
    })

export default async function LittersPage() {
    const { docs: litters } = await find({
        collection: 'litters',
        pagination: false,
    })

    return <LittersOverviewTemplate litters={litters} />
}
