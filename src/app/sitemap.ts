import type { MetadataRoute } from 'next'
import { internalSlug } from '@/lib/links'
import { getClient, LOCALE } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getClient()
    const [navigation, galleries, dogs] = await Promise.all([
        payload.findGlobal({ slug: 'navigation', locale: LOCALE }),
        payload.find({
            collection: 'gallery',
            locale: LOCALE,
            pagination: false,
        }),
        payload.find({ collection: 'dogs', locale: LOCALE, pagination: false }),
    ])

    const pageUrls = (navigation.items ?? []).flatMap((item) => {
        if (item.type === 'link') {
            return item.linkType === 'external'
                ? item.pageExtern
                : internalSlug(item.pageIntern)
        }
        if (item.type === 'subMenu') {
            return (item.subMenu?.items ?? []).map((subItem) =>
                subItem.linkType === 'external'
                    ? subItem.slugExtern
                    : internalSlug(subItem.slugIntern)
            )
        }
        return []
    })

    return [
        ...pageUrls,
        ...galleries.docs.map((doc) => doc.slug),
        ...dogs.docs.map((doc) => doc.slug),
    ]
        .filter(Boolean)
        .map((url) => ({
            url: url.startsWith('/') ? `${process.env.BASE_URL}${url}` : url,
        }))
}
