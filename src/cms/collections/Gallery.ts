import { CollectionConfig } from 'payload/types'
import { Gallery as GalleryBlock } from '../blocks/Image'
import { MetaFields } from '../blocks/Meta'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Gallery: CollectionConfig = {
    slug: 'gallery',
    labels: {
        singular: {
            en: 'Gallery',
            de: 'Gallerie',
        },
        plural: {
            en: 'Galleries',
            de: 'Galleries',
        },
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'text',
            name: 'name',
            localized: true,
        },
        {
            name: 'slug',
            label: {
                de: 'Slug (Pfad in der URL)',
                en: 'Slug (Path in URL)',
            },
            type: 'text',
            required: true,
            localized: true,
        },
        ...MetaFields,
        ...GalleryBlock,
    ],
}

export default Gallery
