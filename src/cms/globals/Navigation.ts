import type { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
    slug: 'navigation',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'items',
            label: {
                de: 'Einträge',
                en: 'Items',
            },
            labels: {
                singular: {
                    de: 'Eintrag',
                    en: 'Item',
                },
                plural: {
                    de: 'Einträge',
                    en: 'Items',
                },
            },
            type: 'array',
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: '/components/RowLabels#LabelRowLabel',
                },
            },
            fields: [
                {
                    name: 'type',
                    type: 'radio',
                    defaultValue: 'link',
                    admin: {
                        layout: 'horizontal',
                    },
                    options: [
                        {
                            label: 'Link',
                            value: 'link',
                        },
                        {
                            label: 'Sub-menu',
                            value: 'subMenu',
                        },
                    ],
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'linkType',
                    type: 'radio',
                    defaultValue: 'internal',
                    admin: {
                        layout: 'horizontal',
                        condition: (_, { type } = {}) => type === 'link',
                    },
                    options: [
                        {
                            label: 'Intern',
                            value: 'internal',
                        },
                        {
                            label: 'Extern',
                            value: 'external',
                        },
                    ],
                },
                {
                    name: 'pageIntern',
                    type: 'relationship',
                    relationTo: ['dogs', 'pages', 'litters'],
                    admin: {
                        condition: (_, { type, linkType } = {}) =>
                            type === 'link' && linkType === 'internal',
                    },
                },
                {
                    name: 'pageExtern',
                    type: 'text',
                    admin: {
                        condition: (_, { type, linkType } = {}) =>
                            type === 'link' && linkType === 'external',
                    },
                },
                {
                    name: 'subMenu',
                    label: false,
                    type: 'group',
                    admin: {
                        condition: (_, { type } = {}) => type === 'subMenu',
                    },
                    fields: [
                        {
                            name: 'items',
                            type: 'array',
                            label: {
                                de: 'Einträge',
                                en: 'Items',
                            },
                            labels: {
                                singular: {
                                    de: 'Eintrag',
                                    en: 'Item',
                                },
                                plural: {
                                    de: 'Einträge',
                                    en: 'Items',
                                },
                            },
                            admin: {
                                components: {
                                    RowLabel:
                                        '/components/RowLabels#LabelRowLabel',
                                },
                            },
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    localized: true,
                                },
                                {
                                    name: 'linkType',
                                    type: 'radio',
                                    defaultValue: 'internal',
                                    admin: {
                                        layout: 'horizontal',
                                    },
                                    options: [
                                        {
                                            label: 'Intern',
                                            value: 'internal',
                                        },
                                        {
                                            label: 'Extern',
                                            value: 'external',
                                        },
                                    ],
                                },
                                {
                                    name: 'slugIntern',
                                    type: 'relationship',
                                    relationTo: ['dogs', 'pages', 'litters'],
                                    admin: {
                                        condition: (_, { linkType } = {}) =>
                                            linkType === 'internal',
                                    },
                                },
                                {
                                    name: 'slugExtern',
                                    type: 'text',
                                    admin: {
                                        condition: (_, { linkType } = {}) =>
                                            linkType === 'external',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

export default Navigation
