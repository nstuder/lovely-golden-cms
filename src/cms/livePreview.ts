import type { CollectionSlug, GlobalSlug, RootLivePreviewConfig } from 'payload'

/** Collections and globals with a live preview in the admin. */
export const LIVE_PREVIEW_COLLECTIONS = [
    'pages',
    'dogs',
    'litters',
    'gallery',
    'news',
] as const satisfies CollectionSlug[]
export const LIVE_PREVIEW_GLOBALS = ['home'] as const satisfies GlobalSlug[]

/**
 * Depth of relationships (images, linked documents) in the preview, same as
 * the website queries (Payload default). Lives here and not in the client
 * component: server components only get a reference for values imported
 * from a 'use client' module.
 */
export const LIVE_PREVIEW_DEPTH = 2

export type LivePreviewCollection = (typeof LIVE_PREVIEW_COLLECTIONS)[number]
export type LivePreviewGlobal = (typeof LIVE_PREVIEW_GLOBALS)[number]

/** Path of the preview page: `/live-preview/<collection>/<id>` or `/live-preview/globals/<slug>`. */
export const livePreviewPath = ({
    collection,
    global,
    id,
    locale,
}: {
    collection?: string
    global?: string
    id?: string | number
    locale?: string
}) => {
    const path = global
        ? `/live-preview/globals/${global}`
        : collection && id !== undefined
        ? `/live-preview/${collection}/${id}`
        : undefined
    if (!path) return undefined
    return locale ? `${path}?locale=${encodeURIComponent(locale)}` : path
}

/**
 * Payload posts the (unsaved) form data to this URL, so it has to be absolute
 * and on the same origin as the admin.
 */
export const livePreviewConfig: RootLivePreviewConfig = {
    collections: [...LIVE_PREVIEW_COLLECTIONS],
    globals: [...LIVE_PREVIEW_GLOBALS],
    url: ({ data, collectionConfig, globalConfig, locale }) => {
        const path = livePreviewPath({
            collection: collectionConfig?.slug,
            global: globalConfig?.slug,
            id: data?.id,
            locale: locale?.code,
        })
        return path ? `${process.env.BASE_URL ?? ''}${path}` : null
    },
    breakpoints: [
        { name: 'mobile', label: 'Handy', width: 375, height: 667 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
    ],
}
