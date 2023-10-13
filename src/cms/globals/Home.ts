import { GlobalConfig } from 'payload/types'

const Home: GlobalConfig = {
    slug: 'home',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
        },
        {
            name: 'content',
            label: {
                en: 'Content',
                de: 'Inhalt',
            },
            type: 'richText',
            localized: true,
        },
    ],
}

export default Home
