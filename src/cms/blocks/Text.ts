import type { Block } from 'payload'

export const RichText: Block = {
    slug: 'richtext',
    labels: {
        singular: {
            en: 'RichText',
            de: 'RichText',
        },
        plural: {
            en: 'RichText',
            de: 'RichText',
        },
    },
    fields: [
        {
            name: 'content',
            type: 'richText',
            required: true,
            localized: true,
        },
    ],
}
