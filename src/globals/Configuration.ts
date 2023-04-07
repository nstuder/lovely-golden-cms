import { GlobalConfig } from 'payload/types'
import { Image, Images } from '../blocks/Image'

const Configuration: GlobalConfig = {
	slug: 'configuration',
	label: {
		de: 'Globale Einstellungen', en: 'Global Settings',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Header',
					fields: Images
				},
				{
					label: 'Footer',
					fields: [
						{
							name: 'footnote',
							label: { de: 'Fußnote', en: 'footnote' },
							type: 'text',
							localized: true,
						},
						{
							name: 'clubs',
							label: {
								de: 'Clubs', en: 'Clubs'
							},
							type: 'array',
							fields: [
								{
									name: 'name',
									type: 'text',
									localized: true,
								},
								{
									name: 'link',
									type: 'text',
									localized: true,
								},
								...Image
							]
						}
					]
				},
			]
		},
	],
}

export default Configuration