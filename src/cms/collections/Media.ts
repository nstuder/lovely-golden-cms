import type { CollectionConfig } from 'payload'
import path from 'path'

/**
 * Browsers may keep uploads for a week. A new upload never overwrites an
 * existing file name (Payload appends -1, -2, …), so URLs don't go stale.
 */
export const setMediaCacheHeaders = (headers: Headers) => {
    headers.set(
        'Cache-Control',
        'public, max-age=604800, stale-while-revalidate=86400'
    )
    return headers
}

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
        group: 'Content',
        defaultColumns: ['id', 'alt', 'filename'],
        listSearchableFields: ['filename'],
    },
    access: {
        read: () => true,
    },
    upload: {
        adminThumbnail: 'thumbnail',
        modifyResponseHeaders: ({ headers }) => setMediaCacheHeaders(headers),
        // Same folder as before (/home/node/media in Docker), resolved from the working dir
        // because `__dirname` points into the Next.js build output.
        staticDir: path.resolve(process.cwd(), 'media'),
        mimeTypes: [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/svg',
            'image/gif',
            'image/webp',
        ],
        imageSizes: [
            {
                name: 'small',
                width: 480,
                height: undefined,
                formatOptions: {
                    format: 'webp',
                    options: {
                        quality: 75,
                    },
                },
            },
            {
                name: 'medium',
                width: 768,
                height: undefined,
                formatOptions: {
                    format: 'webp',
                    options: {
                        quality: 75,
                    },
                },
            },
            {
                name: 'large',
                width: 1280,
                height: undefined,
                formatOptions: {
                    format: 'webp',
                    options: {
                        quality: 75,
                    },
                },
            },
            {
                name: 'extraLarge',
                width: 1920,
                height: undefined,
                formatOptions: {
                    format: 'webp',
                    options: {
                        quality: 75,
                    },
                },
            },
        ],
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            localized: true,
            type: 'text',
            required: true,
        },
    ],
}

export default Media
