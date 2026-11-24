import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    labels: {
        singular: {
            en: 'User',
            de: 'Benutzer',
        },
        plural: {
            en: 'Users',
            de: 'Benutzer',
        },
    },
    access: {
        // only logged in admins may list users (was public: emails + sessions)
        read: ({ req }) => Boolean(req.user),
    },
    fields: [
        // Email added by default
        // Add more fields as needed
    ],
}

export default Users
