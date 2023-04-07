import { GlobalConfig } from 'payload/types'

const SEO: GlobalConfig = {
	slug: 'seo',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'pageUrl',
			type: 'text',
			label: 'PageUrl',
		},
		{
			name: 'author',
			type: 'text',
			label: 'Author',
		},
		{
			name: 'metaTitle',
			type: 'text',
			label: 'Default Meta Title',
		},
		{
			name: 'metaKeywords',
			type: 'text',
			label: 'Default Meta Keywords',
		},
		{
			name: 'metaDescription',
			type: 'text',
			label: 'Default Meta Description',
		},
		{
			name: 'structuredData',
			type: 'code',
			label: 'Structured Data',
		},
	],
}

export default SEO