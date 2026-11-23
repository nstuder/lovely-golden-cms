import type { Field } from 'payload'
import { Images } from '../Image'

export const Shows: Field[] = [
    {
        name: 'shows',
        label: {
            de: 'Ausstellungen',
            en: 'Shows',
        },
        labels: {
            singular: {
                de: 'Ausstellung',
                en: 'Show',
            },
            plural: {
                de: 'Ausstellungen',
                en: 'Shows',
            },
        },
        type: 'array',
        fields: [
            {
                name: 'location',
                label: {
                    de: 'Ort',
                    en: 'Location',
                },
                type: 'text',
            },
            {
                name: 'date',
                type: 'date',
                label: {
                    de: 'Datum',
                    en: 'Date',
                },
                admin: {
                    date: {
                        pickerAppearance: 'dayOnly',
                        displayFormat: 'dd.MM.yyyy',
                    },
                },
            },
            {
                name: 'class',
                label: {
                    de: 'Klasse',
                    en: 'Class',
                },
                type: 'text',
            },
            {
                name: 'result',
                label: {
                    de: 'Beurteilung',
                    en: 'Result',
                },
                type: 'text',
            },
        ],
        admin: {
            initCollapsed: true,
            components: {
                RowLabel: '/components/RowLabels#ShowRowLabel',
            },
        },
    },
    ...Images,
]
