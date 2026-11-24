import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
    LIVE_PREVIEW_COLLECTIONS,
    LIVE_PREVIEW_DEPTH,
    LIVE_PREVIEW_GLOBALS,
    type LivePreviewCollection,
    type LivePreviewGlobal,
} from '@/cms/livePreview'
import {
    LivePreview,
    type LivePreviewProps,
} from '@/components/pages/LivePreview'
import { decodeParam, getClient, LOCALE } from '@/lib/payload'

type Props = {
    params: Promise<{ collection: string; id: string }>
    searchParams: Promise<{ locale?: string }>
}

export const metadata: Metadata = {
    title: 'Vorschau',
    robots: { index: false, follow: false },
}

const isCollection = (slug: string): slug is LivePreviewCollection =>
    (LIVE_PREVIEW_COLLECTIONS as readonly string[]).includes(slug)
const isGlobal = (slug: string): slug is LivePreviewGlobal =>
    (LIVE_PREVIEW_GLOBALS as readonly string[]).includes(slug)

/**
 * Target of the admin's Live Preview: `/live-preview/<collection>/<id>` and
 * `/live-preview/globals/<slug>`. Only visible for logged in admins.
 */
export default async function LivePreviewPage({ params, searchParams }: Props) {
    const { collection, id: rawId } = await params
    const id = decodeParam(rawId)
    const locale = (await searchParams).locale === 'en' ? 'en' : LOCALE

    const payload = await getClient()
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) notFound()

    const options = {
        locale,
        depth: LIVE_PREVIEW_DEPTH,
        user,
        overrideAccess: false,
    } as const

    let props: LivePreviewProps
    if (collection === 'globals' && isGlobal(id)) {
        const [home, news] = await Promise.all([
            payload.findGlobal({ slug: id, ...options }),
            payload.find({
                collection: 'news',
                locale,
                limit: 5,
                sort: '-publishedAt',
            }),
        ])
        props = {
            type: id,
            initialData: home,
            news: news.docs.map(({ id, title, publishedAt, link }) => ({
                id,
                title,
                publishedAt,
                link,
            })),
        }
    } else if (isCollection(collection)) {
        const doc = await payload
            .findByID({ collection, id, disableErrors: true, ...options })
            .catch(() => null)
        if (!doc) notFound()
        props = { type: collection, initialData: doc } as LivePreviewProps
    } else {
        notFound()
    }

    return <LivePreview {...props} />
}
