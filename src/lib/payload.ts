import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { permanentRedirect } from 'next/navigation'
import {
    getPayload,
    type CollectionSlug,
    type DataFromCollectionSlug,
    type DataFromGlobalSlug,
    type GlobalSlug,
    type PaginatedDocs,
    type Sort,
    type Where,
} from 'payload'
import { cache } from 'react'
import { CMS_CACHE_TAG } from '@/cms/revalidate'

export const LOCALE = 'de'

export const getClient = () => getPayload({ config })

type FindArgs<T extends CollectionSlug> = {
    collection: T
    where?: Where
    sort?: Sort
    limit?: number
    page?: number
    pagination?: boolean
}

/**
 * Website data is cached across requests until something changes in the
 * admin (see src/cms/revalidate.ts). The arguments are part of the cache key.
 */
const cachedFind = unstable_cache(
    async (args: FindArgs<CollectionSlug>) =>
        (await getClient()).find({ ...args, locale: LOCALE }),
    ['payload-find'],
    { tags: [CMS_CACHE_TAG] }
)

const cachedFindGlobal = unstable_cache(
    async (slug: GlobalSlug) =>
        (await getClient()).findGlobal({ slug, locale: LOCALE }),
    ['payload-find-global'],
    { tags: [CMS_CACHE_TAG] }
)

/** `payload.find` in German for the website, cached. */
export const find = <T extends CollectionSlug>(args: FindArgs<T>) =>
    cachedFind(args) as Promise<PaginatedDocs<DataFromCollectionSlug<T>>>

/** `payload.findGlobal` in German for the website, cached. */
export const findGlobal = <T extends GlobalSlug>(slug: T) =>
    cachedFindGlobal(slug) as Promise<DataFromGlobalSlug<T>>

/** Navigation + configuration, needed by every page (header/footer). */
export const getLayoutGlobals = cache(async () => {
    const [navigation, configuration] = await Promise.all([
        findGlobal('navigation'),
        findGlobal('configuration'),
    ])
    return { navigation, configuration }
})

export const getSeo = cache(() => findGlobal('seo'))

type SlugCollection = Extract<
    CollectionSlug,
    'dogs' | 'gallery' | 'litters' | 'pages'
>

const findBySlugUncached = async <T extends SlugCollection>(
    collection: T,
    path: string
): Promise<DataFromCollectionSlug<T> | undefined> => {
    const { docs } = await find({
        collection,
        where: { slug: { equals: path } },
        limit: 1,
    })
    return docs[0]
}

/** Document whose slug is exactly `path` (e.g. `/hunde/summer`). */
export const findBySlug = cache(findBySlugUncached) as typeof findBySlugUncached

/**
 * Old links: the Express version found documents by any part of the slug,
 * case-insensitive (`/hunde/Summer`, `/summer`). If exactly one document
 * ends with the last path segment, that's where the page lives now.
 */
const findMovedSlug = async (collection: SlugCollection, path: string) => {
    const segment = path.split('/').filter(Boolean).pop()?.toLowerCase()
    if (!segment) return undefined
    const { docs } = await find({
        collection,
        where: { slug: { like: segment } },
        pagination: false,
    })
    const matches = docs.filter((doc) => {
        const slug = doc.slug?.toLowerCase() ?? ''
        return slug === `/${segment}` || slug.endsWith(`/${segment}`)
    })
    const target = matches.length === 1 ? matches[0].slug : undefined
    return target && target !== path ? target : undefined
}

/**
 * Like findBySlug, but redirects (308) old URLs to the current slug instead
 * of rendering the same document under several URLs.
 */
export const findBySlugOrRedirect = async <T extends SlugCollection>(
    collection: T,
    path: string
): Promise<DataFromCollectionSlug<T> | undefined> => {
    const doc = await findBySlug(collection, path)
    if (doc) return doc
    const moved = await findMovedSlug(collection, path)
    if (moved) permanentRedirect(encodeURI(moved))
    return undefined
}

export const decodeParam = (value: string) => {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}
