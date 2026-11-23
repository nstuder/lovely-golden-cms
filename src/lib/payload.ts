import config from '@payload-config'
import {
    getPayload,
    type CollectionSlug,
    type DataFromCollectionSlug,
} from 'payload'
import { cache } from 'react'

export const LOCALE = 'de'

export const getClient = () => getPayload({ config })

/** Navigation + configuration, needed by every page (header/footer). */
export const getLayoutGlobals = cache(async () => {
    const payload = await getClient()
    const [navigation, configuration] = await Promise.all([
        payload.findGlobal({ slug: 'navigation', locale: LOCALE }),
        payload.findGlobal({ slug: 'configuration', locale: LOCALE }),
    ])
    return { navigation, configuration }
})

export const getSeo = cache(async () => {
    const payload = await getClient()
    return payload.findGlobal({ slug: 'seo', locale: LOCALE })
})

type SlugCollection = Extract<
    CollectionSlug,
    'dogs' | 'gallery' | 'litters' | 'pages'
>

const findBySlugUncached = async <T extends SlugCollection>(
    collection: T,
    value: string,
    fullPath?: string
): Promise<DataFromCollectionSlug<T> | undefined> => {
    const payload = await getClient()
    const { docs } = await payload.find({
        collection,
        locale: LOCALE,
        where: { slug: { like: value } },
        pagination: false,
    })
    const slugOf = (doc: (typeof docs)[number]) => doc.slug
    return (docs.find((doc) => slugOf(doc) === (fullPath ?? value)) ??
        docs.find((doc) => slugOf(doc)?.endsWith(`/${value}`)) ??
        docs[0]) as DataFromCollectionSlug<T> | undefined
}

/**
 * Finds a document by (part of) its slug, the same way the Express version
 * did (`like`). If several documents match, an exact match wins.
 */
export const findBySlug = cache(findBySlugUncached) as typeof findBySlugUncached

export const decodeParam = (value: string) => {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}
