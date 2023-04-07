import { CollectionConfig } from 'payload/types'
import { ContentFields } from '../blocks/Content'
import { MetaFields } from '../blocks/Meta'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		...MetaFields,
		{
			name: 'title',
			type: 'text',
		},
		{
			name: 'path',
			type: 'text',
			required: true,
		},
		...ContentFields
	],
}

export default Pages