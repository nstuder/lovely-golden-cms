import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import Users from './collections/Users'
import Dogs from './collections/Dogs'
import News from './collections/News'
import Litters from './collections/Litters'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Gallery from './collections/Gallery'
import Navigation from './globals/Navigation'
import Home from './globals/Home'
import Configuration from './globals/Configuration'
import SEO from './globals/SEO'
import { livePreviewConfig } from './livePreview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    serverURL: process.env.BASE_URL,
    secret: process.env.PAYLOAD_SECRET || '',
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
    }),
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: dirname,
        },
        livePreview: livePreviewConfig,
    },
    editor: slateEditor({}),
    globals: [Navigation, Home, Configuration, SEO],
    collections: [Users, Pages, Dogs, News, Litters, Media, Gallery],
    localization: {
        locales: ['en', 'de'],
        defaultLocale: 'de',
        fallback: true,
    },
    i18n: {
        fallbackLanguage: 'de',
        supportedLanguages: { de, en },
    },
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // not used by the website or the admin (both use the REST API)
    graphQL: {
        disable: true,
    },
    upload: {
        limits: {
            fileSize: 6000000, // 6MB, written in bytes
        },
    },
    sharp,
})
