import { GalleriesOverviewTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { find } from '@/lib/payload'

export const generateMetadata = () =>
    buildMetadata({
        metaTitle: 'Galerie',
        metaDescription: 'Galerie',
        pageUrl: `${process.env.BASE_URL}/galerie`,
    })

export default async function GalleriesPage() {
    const { docs: galleries } = await find({
        collection: 'gallery',
        pagination: false,
    })

    return <GalleriesOverviewTemplate galleries={galleries} />
}
