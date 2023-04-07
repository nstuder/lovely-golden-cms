import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	admin: {
		useAsTitle: 'email',
	},
	labels: {
		singular: {
			en: 'User', de: 'Benutzer',
		},
		plural: {
			en: 'Users', de: 'Benutzer',
		},
	},
	access: {
		read: () => true,
	},
	fields: [
		// Email added by default
		// Add more fields as needed
	],
}

export default Users