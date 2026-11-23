import type { Metadata } from 'next'
import type { Media } from '@/cms/payload-types'
import { getSeo } from './payload'

type MetaOverrides = {
    metaTitle?: string | null
    metaDescription?: string | null
    metaKeywords?: string | null
    image?: Media | string | null
    pageUrl?: string | null
}

/** SEO global defaults, overridden per page (like `withMeta` in the Express version). */
export const buildMetadata = async (
    overrides: MetaOverrides = {}
): Promise<Metadata> => {
    const seo = await getSeo()
    const title = overrides.metaTitle || seo.metaTitle || undefined
    const description =
        overrides.metaDescription || seo.metaDescription || undefined
    const keywords = overrides.metaKeywords || seo.metaKeywords || undefined
    const pageUrl = overrides.pageUrl || seo.pageUrl || undefined
    const image = overrides.image ?? seo.image
    const imageUrl =
        image && typeof image === 'object' && image.url ? image.url : undefined
    const author = seo.author || undefined

    return {
        title,
        description,
        keywords,
        authors: author ? [{ name: author }] : undefined,
        robots: 'index,follow',
        other: {
            ...(title ? { title } : {}),
            ...(author ? { copyright: author } : {}),
        },
        openGraph: {
            type: 'website',
            url: pageUrl,
            title,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        },
    }
}
