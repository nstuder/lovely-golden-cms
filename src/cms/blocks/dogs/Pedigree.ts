import { Block, Field } from 'payload/types'

export const pedigreeFields: Field[] = [
    {
        name: 'father',
        type: 'group', // required
        label: {
            en: 'Father',
            de: 'Vater',
        },
        fields: [
            {
                name: 'name',
                type: 'text',
            },
            {
                name: 'fatherImage',
                label: {
                    en: 'Image',
                    de: 'Bild',
                },
                type: 'upload',
                relationTo: 'media',
                required: true,
            },
            {
                name: 'grandfather',
                type: 'group', // required
                label: {
                    en: 'Grandfather',
                    de: 'Großvater',
                },
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                    },
                    {
                        name: 'greatGrandparents',
                        type: 'group', // required
                        label: {
                            en: 'great grandparents',
                            de: 'Urgroßeltern',
                        },
                        fields: [
                            {
                                name: 'father',
                                label: {
                                    en: 'Father',
                                    de: 'Vater',
                                },
                                type: 'text',
                            },
                            {
                                name: 'mother',
                                label: {
                                    en: 'Mother',
                                    de: 'Mutter',
                                },
                                type: 'text',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'grandmother',
                type: 'group', // required
                label: {
                    en: 'grandmother',
                    de: 'Großmutter',
                },
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                    },
                    {
                        name: 'greatGrandparents',
                        type: 'group', // required
                        label: {
                            en: 'great grandparents',
                            de: 'Urgroßeltern',
                        },
                        fields: [
                            {
                                name: 'father',
                                label: {
                                    en: 'Father',
                                    de: 'Vater',
                                },
                                type: 'text',
                            },
                            {
                                name: 'mother',
                                type: 'text',
                                label: {
                                    en: 'Mother',
                                    de: 'Mutter',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'mother',
        type: 'group', // required
        label: {
            en: 'mother',
            de: 'Mutter',
        },
        fields: [
            {
                name: 'name',
                type: 'text',
            },
            {
                name: 'motherImage',
                label: {
                    en: 'Image',
                    de: 'Bild',
                },
                type: 'upload',
                relationTo: 'media',
                required: true,
            },
            {
                name: 'grandfather',
                type: 'group', // required
                label: {
                    en: 'Grandfather',
                    de: 'Großvater',
                },
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                    },
                    {
                        name: 'greatGrandparents',
                        type: 'group', // required
                        label: {
                            en: 'great grandparents',
                            de: 'Urgroßeltern',
                        },
                        fields: [
                            {
                                name: 'father',
                                label: {
                                    en: 'Father',
                                    de: 'Vater',
                                },
                                type: 'text',
                            },
                            {
                                name: 'mother',
                                label: {
                                    en: 'Mother',
                                    de: 'Mutter',
                                },
                                type: 'text',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'grandmother',
                type: 'group', // required
                label: {
                    en: 'grandmother',
                    de: 'Großmutter',
                },
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                    },
                    {
                        name: 'greatGrandparents',
                        type: 'group', // required
                        label: {
                            en: 'great grandparents',
                            de: 'Urgroßeltern',
                        },
                        fields: [
                            {
                                name: 'father',
                                label: {
                                    en: 'Father',
                                    de: 'Vater',
                                },
                                type: 'text',
                            },
                            {
                                name: 'mother',
                                type: 'text',
                                label: {
                                    en: 'Mother',
                                    de: 'Mutter',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

export const Pedigree: Block = {
    slug: 'pedigree',
    labels: {
        singular: {
            en: 'Pedigree',
            de: 'Ahnentafel',
        },
        plural: {
            en: 'Pedigree',
            de: 'Ahnentafel',
        },
    },
    fields: pedigreeFields,
}
