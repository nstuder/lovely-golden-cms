import { notFound } from 'next/navigation'
import { ContentPageTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { findBySlug } from '@/lib/payload'

const getPage = (path: string) => findBySlug('pages', path, path)

export const cmsPageMetadata = async (path: string) => {
    const page = await getPage(path)
    if (!page) return {}
    return buildMetadata({
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        pageUrl: `${process.env.BASE_URL}${page.slug}`,
    })
}

/** Page from the `pages` collection, used as fallback for every unknown path. */
export const CmsPage = async ({ path }: { path: string }) => {
    const page = await getPage(path)
    if (!page) notFound()
    return <ContentPageTemplate title={page.title} content={page.content} />
}
