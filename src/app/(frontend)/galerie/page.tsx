import { GalleriesOverviewTemplate } from '@/components/templates'
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

    return <GalleriesOverviewTemplate galleries={galleries} />
}
