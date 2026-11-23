import { notFound } from 'next/navigation'
import { ContentBlocks } from '@/components/ContentBlocks'
import { buildMetadata } from './metadata'
import { findBySlug } from './payload'

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
    return (
        <section className="container">
            <h1>{page.title}</h1>
            <ContentBlocks content={page.content} />
        </section>
    )
}
