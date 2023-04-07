import { Field } from 'payload/types'

export const MetaFields: Field[] = [
	{
		name: 'metaTitle',
		type: 'text',
		label: 'Meta Title',
		admin: {
			position: 'sidebar',
		},
		localized: true,
	},
	{
		name: 'metaKeywords',
		type: 'text',
		label: 'Meta Keywords',
		admin: {
			position: 'sidebar',
		},
		localized: true,
	},
	{
		name: 'metaDescription',
		type: 'text',
		label: 'Meta Description',
		admin: {
			position: 'sidebar',
		},
		localized: true,
	},
]