import { CollectionConfig } from 'payload/types'
import path from 'path'

const Media: CollectionConfig = {
	slug: 'media',
	admin: {
		useAsTitle: 'filename',
		description: 'Uploads are set to read-only for this demo.',
		group: 'Content'
	},
	access: {
		read: () => true,
	},
	upload: {
		adminThumbnail: 'thumbnail',
		staticDir: path.resolve(__dirname, '../../media'),
		mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif'],
		imageSizes: [
			{
				name: 'small',
				width: 480,
				height: undefined,
			},
			{
				name: 'medium',
				width: 768,
				height: undefined,
			},
			{
				name: 'large',
				width: 1280,
				height: undefined,
			},
			{
				name: 'extraLarge',
				width: 1920,
				height: undefined,
			}
		],
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			localized: true,
			type: 'text',
			required: true,
		},
	],
}

export default Media