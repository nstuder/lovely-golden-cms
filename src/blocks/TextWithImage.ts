import { Block } from 'payload/types'
import { Image } from './Image'

export const TextWithImage: Block = {
	slug: 'text-with-image',
	labels: {
		singular: {
			en: 'TextWith Image', de: 'Text mit Bild'
		},
		plural: {
			en: 'Text With Image', de: 'Text mit Bild'
		}
	},
	fields: [
		{
			name: 'right', // required
			type: 'checkbox', // required
			label: 'right',
			defaultValue: false,
		},
		{
			name: 'Content',
			type: 'richText',
			required: true,
			localized: true,
		},
		...Image
	],
}