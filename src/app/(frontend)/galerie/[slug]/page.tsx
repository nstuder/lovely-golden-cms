import { CmsPage, cmsPageMetadata } from '@/components/pages'
import { GalleryDetailTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { decodeParam, findBySlugOrRedirect } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const load = async ({ params }: Props) => {
    const slug = decodeParam((await params).slug)
    const path = `/galerie/${slug}`
    return { path, gallery: await findBySlugOrRedirect('gallery', path) }
}

export const generateMetadata = async (props: Props) => {
    const { gallery, path } = await load(props)
    if (!gallery) return cmsPageMetadata(path)
    return buildMetadata({
        metaTitle: gallery.metaTitle || gallery.name,
        metaDescription: gallery.metaDescription || gallery.name,
        metaKeywords: gallery.metaKeywords,
        pageUrl: `${process.env.BASE_URL}${gallery.slug}`,
    })
}

export default async function GalleryPage(props: Props) {
    const { gallery, path } = await load(props)
    if (!gallery) return <CmsPage path={path} />

    return <GalleryDetailTemplate gallery={gallery} />
}
