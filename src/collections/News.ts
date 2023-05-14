import { CollectionConfig } from 'payload/types'
import { NewsFields } from '../blocks/News'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const NewsCollection: CollectionConfig = {
	slug: 'news',
	labels: {
		singular: {
			en: 'Post', de: 'Eintrag',
		},
		plural: {
			en: 'News', de: 'Aktuelles',
		},
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'publishedAt']
	},
	fields: [
		...NewsFields,
		{
			name: 'link',
			type: 'text',
			label: {
				de: 'Link', en: 'Link'
			},
			defaultValue: '/aktuelles'
		}
	]
}

export default NewsCollection