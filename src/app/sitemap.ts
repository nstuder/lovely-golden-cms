import type { MetadataRoute } from 'next'
import { internalSlug } from '@/lib/links'
import { find, findGlobal } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [navigation, galleries, dogs] = await Promise.all([
        findGlobal('navigation'),
        find({ collection: 'gallery', pagination: false }),
        find({ collection: 'dogs', pagination: false }),
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
        .filter((url): url is string => Boolean(url))
        .map((url) => ({
            url: url.startsWith('/') ? `${process.env.BASE_URL}${url}` : url,
        }))
}
