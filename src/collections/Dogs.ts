import { CollectionConfig } from 'payload/types'
import { pedigreeFields } from '../blocks/dogs/Pedigree'
import { Shows } from '../blocks/dogs/Shows'
import { Gallery } from '../blocks/Image'
import { MetaFields } from '../blocks/Meta'
import { ContentFields } from '../blocks/Content'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Dogs: CollectionConfig = {
	slug: 'dogs',
	labels: {
		singular: {
			en: 'Dog', de: 'Hund',
		},
		plural: {
			en: 'Dogs', de: 'Hunde',
		},
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		...MetaFields,
		{
			name: 'name',
			required: true,
			label: {
				de: 'Name', en: 'Name'
			},
			type: 'text',
		},
		{
			name: 'slug',
			label: {
				de: 'Slug (Pfad in der URL)', en: 'Slug (Path in URL)'
			},
			type: 'text',
			required: true,
			localized: true,
		},
		{
			name: 'breedingName',
			required: true,
			label: {
				de: 'Züchter Name', en: 'Breeding Name'
			},
			type: 'text',
		},
		{
			name: 'type',
			type: 'select',
			required: true,
			options: [
				{ label: { de: 'Zuchthündin', en: 'Female' }, value: 'fzucht' },
				{ label: { de: 'Zuchtrüde', en: 'Male' }, value: 'rzucht' },
				{ label: { de: 'Youngster', en: 'Young' }, value: 'young' },
				{ label: { de: 'Im Ruhestand', en: 'Retirement' }, value: 'retirement' },
				{ label: { de: 'In Memoriam', en: 'Dead' }, value: 'dead' },
			]
		},
		{
			name: 'headImage',
			label: {
				en: 'Head Image', de: 'Kopf Bild'
			},
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'standImage',
			label: {
				en: 'Standing Image', de: 'Stand Bild'
			},
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'description',
			label: {
				en: 'description', de: 'Beschreibung'
			},
			type: 'richText',
			localized: true,
		},
		{
			type: 'tabs', // required
			tabs: [ // required
				{
					label: 'Gallerie', // required
					fields: Gallery
				},
				{
					label: 'Ahnentafel', // required
					fields: pedigreeFields,
				},
				{
					label: 'Prüfungen', // required
					fields: [
						{
							name: 'isActive',
							label: {
								de: 'Active', en: 'active'
							},
							type: 'checkbox'
						},
						{
							name: 'text',
							type: 'richText'
						}
					],
				},
				{
					label: 'Ausstellungen', // required
					fields: [
						{
							name: 'isActive',
							label: {
								de: 'Active', en: 'active'
							},
							type: 'checkbox'
						},
						...Shows
					]
				},
				{
					label: 'Nachzucht', // required
					fields: [
						{
							name: 'isActive',
							label: {
								de: 'Active', en: 'active'
							},
							type: 'checkbox'
						},
						...ContentFields
					]
				}
			],
		}
	]
}

export default Dogs