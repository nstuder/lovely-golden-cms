import { Field } from 'payload/types'
import { ContentFields } from './Content'

export const NewsFields: Field[] = [
    {
        name: 'title',
        type: 'text',
        localized: true,
    },
    {
        name: 'publishedAt', // required
        type: 'date', // required
        label: 'Datum',
        admin: {
            date: {
                pickerAppearance: 'dayOnly',
                displayFormat: 'dd.MM.yyyy',
            },
        },
    },
    ...ContentFields,
]

export const NewsArray: Field = {
    name: 'news',
    labels: {
        singular: {
            en: 'News',
            de: 'Neuigkeit',
        },
        plural: {
            en: 'News',
            de: 'Neuigkeiten',
        },
    },
    label: {
        en: 'News',
        de: 'Neuigkeiten',
    },
    admin: {
        initCollapsed: true,
        components: {
            RowLabel: ({ data }) => {
                return data.title
            },
        },
    },
    type: 'array',
    fields: NewsFields,
}
