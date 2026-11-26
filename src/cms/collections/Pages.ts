import type { CollectionConfig } from 'payload'
import { ContentFields } from '../blocks/Content'
import { MetaFields } from '../blocks/Meta'
import { slugField } from '../blocks/Slug'

const Pages: CollectionConfig = {
    slug: 'pages',
    labels: {
        singular: {
            en: 'Page',
            de: 'Seite',
        },
        plural: {
            en: 'Pages',
            de: 'Seiten',
        },
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        ...MetaFields,
        {
            name: 'title',
            type: 'text',
        },
        slugField(),
        ...ContentFields,
    ],
}

export default Pages
