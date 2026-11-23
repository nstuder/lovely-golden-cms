import type { CollectionConfig } from 'payload'
import path from 'path'

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
        description: 'Uploads are set to read-only for this demo.',
        group: 'Content',
        defaultColumns: ['id', 'alt', 'filename'],
        listSearchableFields: ['filename'],
    },
    access: {
        read: () => true,
    },
    upload: {
        adminThumbnail: 'thumbnail',
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
