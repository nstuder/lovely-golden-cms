import { CollectionConfig } from 'payload/types'
import { pedigreeFields } from '../blocks/dogs/Pedigree'
import { MetaFields } from '../blocks/Meta'
import { NewsArray } from '../blocks/News'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Litters: CollectionConfig = {
	slug: 'litters',
	labels: {
		singular: {
			en: 'Litter', de: 'Wurf',
		},
		plural: {
			en: 'Litters', de: 'Würfe',
		},
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		...MetaFields,
		{
			name: 'slug',
			type: 'text',
			required: true,
		},
		{
			type: 'tabs', // required
			tabs: [ // required
				{
					label: {
						en: 'General', de: 'Allgemein'
					},
					fields: [
						{
							name: 'name',
							type: 'text',
							localized: true,
						},
						{
							name: 'collage',
							label: {
								en: 'Litter Collage', de: 'Wurfcollage'
							},
							type: 'upload',
							relationTo: 'media',
						}, 
						{
							name: 'description',
							label: {
								en: 'description', de: 'Beschreibung'
							},
							type: 'richText',
							localized: true,
						}
					]
				},
				{
					label: {
						de: 'Ahnentafel', en: 'Pedegree'
					},
					fields: pedigreeFields,
				},
				{
					label: {
						en: 'Health Outcomes', de: 'Gesundheitsergebnisse'
					},
					fields: [
						{
							name: 'isActive',
							label: {
								de: 'Active', en: 'active'
							},
							type: 'checkbox'
						},
						{
							name: 'puppies',
							type: 'array',
							label: {
								en: 'Puppies', de: 'Welpen'
							},
							labels: {
								singular: {
									en: 'Puppy', de: 'Welpe',
								},
								plural: {
									en: 'Puppies', de: 'Welpen',
								},
							},
							admin: {
								components: {
									RowLabel: ({ data }) => {
										return data.name
									},
								},
							},
							fields: [
								{
									name: 'name',
									type: 'text',
									required: true
								},
								{
									name: 'gender',
									type: 'text',
									required: true,
									localized: true,
								},
								{
									name: 'health',
									label: {
										en: 'health outcomes', de: 'Gesundheitsergebnisse'
									},
									type: 'text',
									required: true,
									localized: true,
								}
							]
						}
					]
				},
				{
					label: {
						de: 'Weitere Tabs', en: 'Other Tabs'
					},
					fields: [{
						name: 'tabs',
						label: {
							de: 'Tabs', en: 'Tabs'
						},
						type: 'array',
						admin: {
							components: {
								RowLabel: ({ data }) => {
									return data.name
								},
							},
						},
						fields: [
							{
								name: 'name',
								label: {
									de: 'Tab Name', en: 'Tab Name'
								},
								type: 'text'
							},
							NewsArray
						]
					}],
				}
			],
		}
	]
}

export default Litters