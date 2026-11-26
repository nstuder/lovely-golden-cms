import type { CollectionConfig } from 'payload'
import { Gallery as GalleryBlock } from '../blocks/Image'
import { MetaFields } from '../blocks/Meta'
import { slugField } from '../blocks/Slug'

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
        slugField({ prefix: '/galerie/', localized: true }),
        ...MetaFields,
        ...GalleryBlock,
    ],
}

export default Gallery
