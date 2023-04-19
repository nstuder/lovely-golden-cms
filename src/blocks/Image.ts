import { Block, Field } from 'payload/types'

export const Image: Field[] = [
	{
		name: 'image',
		label: {
			en: 'Image', de: 'Bild'
		},
		type: 'upload',
		relationTo: 'media',
	},
]

export const Images: Field[] = [
	{
		name: 'images', // required
		type: 'array', // required
		labels: {
			plural: {
				en: 'Images', de: 'Bilder'
			},
			singular: {
				de: 'Bild', en: 'Image'
			}
		},
		fields: [
			...Image,
			{
				name: 'altAsCaption',
				type: 'checkbox',
				label: {
					en: 'Alt Text als Untertitel anzeigen', de: 'use Alt Text as Caption'
				},
				defaultValue: false,
			}
		]
	}
]

export const Gallery: Field[] = [
	{
		name: 'gallery', // required
		type: 'array', // required
		labels: {
			plural: {
				en: 'Images', de: 'Bilder'
			},
			singular: {
				de: 'Bild', en: 'Image'
			}
		},
		fields: Image
	}
]


export const ImagesBlock: Block = {
	slug: 'images',
	labels: {
		singular: {
			en: 'Images', de: 'Bilder'
		},
		plural: {
			en: 'Images', de: 'Bilder'
		}
	},
	fields: Images
}