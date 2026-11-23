import { CmsPage, cmsPageMetadata } from '@/components/pages'
import { LitterDetailTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { decodeParam, findBySlug } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const load = async ({ params }: Props) => {
    const slug = decodeParam((await params).slug)
    const path = `/wuerfe/${slug}`
    return { path, litter: await findBySlug('litters', slug, path) }
}

export const generateMetadata = async (props: Props) => {
    const { litter, path } = await load(props)
    if (!litter) return cmsPageMetadata(path)
    return buildMetadata({
        metaTitle: litter.name,
        metaDescription: litter.metaDescription || litter.name,
        metaKeywords: litter.metaKeywords,
        image: litter.collage,
        pageUrl: `${process.env.BASE_URL}${litter.slug}`,
    })
}

export default async function LitterPage(props: Props) {
    const { litter, path } = await load(props)
    if (!litter) return <CmsPage path={path} />

    return <LitterDetailTemplate litter={litter} />
}
