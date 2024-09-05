import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Dogs from './collections/Dogs'
import News from './collections/News'
import Litters from './collections/Litters'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Navigation from './globals/Navigation'
import Home from './globals/Home'
import Gallery from './collections/Gallery'
import Configuration from './globals/Configuration'
import SEO from './globals/SEO'
import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
    serverURL: process.env.BASE_URL,
    db: mongooseAdapter({
        url: process.env.MONGODB_URI,
    }),
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    editor: slateEditor({}),
    globals: [Navigation, Home, Configuration, SEO],
    collections: [Users, Pages, Dogs, News, Litters, Media, Gallery],
    localization: {
        locales: ['en', 'de'],
        defaultLocale: 'de',
        fallback: true,
    },
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    upload: {
        limits: {
            fileSize: 6000000, // 6MB, written in bytes
        },
    },
})
