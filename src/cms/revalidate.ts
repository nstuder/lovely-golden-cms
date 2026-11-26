import { revalidateTag } from 'next/cache'
import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    CollectionConfig,
    GlobalAfterChangeHook,
    GlobalConfig,
    PayloadRequest,
} from 'payload'

/**
 * Tag of every cached website query (src/lib/payload.ts). Pages link and
 * embed each other (navigation, pedigrees, images), so any change clears the
 * whole website cache; the content changes rarely, the next request reloads it.
 */
export const CMS_CACHE_TAG = 'cms'

export const clearWebsiteCache = (req: PayloadRequest) => {
    try {
        // expire right away: the editor sees the change on the next reload
        revalidateTag(CMS_CACHE_TAG, { expire: 0 })
    } catch (error) {
        // outside of a Next.js request (e.g. `payload migrate`) there is no cache to clear
        req.payload.logger.warn(
            `website cache not cleared: ${(error as Error).message}`
        )
    }
}

const afterCollectionChange: CollectionAfterChangeHook = ({ doc, req }) => {
    clearWebsiteCache(req)
    return doc
}

const afterCollectionDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    clearWebsiteCache(req)
    return doc
}

const afterGlobalChange: GlobalAfterChangeHook = ({ doc, req }) => {
    clearWebsiteCache(req)
    return doc
}

/** Adds the cache hooks to a collection shown on the website. */
export const withCollectionRevalidation = (
    config: CollectionConfig
): CollectionConfig => ({
    ...config,
    hooks: {
        ...config.hooks,
        afterChange: [
            ...(config.hooks?.afterChange ?? []),
            afterCollectionChange,
        ],
        afterDelete: [
            ...(config.hooks?.afterDelete ?? []),
            afterCollectionDelete,
        ],
    },
})

/** Adds the cache hook to a global shown on the website. */
export const withGlobalRevalidation = (config: GlobalConfig): GlobalConfig => ({
    ...config,
    hooks: {
        ...config.hooks,
        afterChange: [...(config.hooks?.afterChange ?? []), afterGlobalChange],
    },
})
