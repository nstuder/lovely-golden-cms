import { LittersOverviewTemplate } from '@/components/templates'
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

    return <LittersOverviewTemplate litters={litters} />
}
