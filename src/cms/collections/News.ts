import type { CollectionConfig } from 'payload'
import { NewsFields } from '../blocks/News'

const NewsCollection: CollectionConfig = {
    slug: 'news',
    labels: {
        singular: {
            en: 'Post',
            de: 'Eintrag',
        },
        plural: {
            en: 'News',
            de: 'Aktuelles',
        },
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedAt'],
    },
    fields: [
        ...NewsFields,
        {
            name: 'link',
            type: 'text',
            label: {
                de: 'Link',
                en: 'Link',
            },
            defaultValue: '/aktuelles',
        },
    ],
}

export default NewsCollection
