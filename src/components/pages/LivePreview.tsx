'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { LIVE_PREVIEW_DEPTH } from '@/cms/livePreview'
import type {
    Dog,
    Gallery,
    Home,
    Litter,
    News,
    Page,
} from '@/cms/payload-types'
import {
    ContentPageTemplate,
    DogDetailTemplate,
    GalleryDetailTemplate,
    HomeTemplate,
    LitterDetailTemplate,
    NewsListTemplate,
} from '@/components/templates'

export type LivePreviewProps =
    | { type: 'pages'; initialData: Page }
    | { type: 'dogs'; initialData: Dog }
    | { type: 'litters'; initialData: Litter }
    | { type: 'gallery'; initialData: Gallery }
    | { type: 'news'; initialData: News }
    | {
          type: 'home'
          initialData: Home
          /** latest news, not part of the edited document */
          news: Pick<News, 'id' | 'title' | 'publishedAt' | 'link'>[]
      }

const render = (props: LivePreviewProps) => {
    switch (props.type) {
        case 'pages':
            return (
                <ContentPageTemplate
                    title={props.initialData.title}
                    content={props.initialData.content}
                />
            )
        case 'dogs':
            return <DogDetailTemplate dog={props.initialData} />
        case 'litters':
            return <LitterDetailTemplate litter={props.initialData} />
        case 'gallery':
            return <GalleryDetailTemplate gallery={props.initialData} />
        case 'news':
            return (
                <NewsListTemplate
                    news={[props.initialData]}
                    pagination={{ totalPages: 1, activePage: 1 }}
                />
            )
        case 'home':
            return <HomeTemplate home={props.initialData} news={props.news} />
    }
}

/**
 * Renders a document with the template of the website and updates it while
 * it is edited in the admin (inside the Live Preview iframe).
 */
export const LivePreview = (props: LivePreviewProps) => {
    const { data } = useLivePreview<LivePreviewProps['initialData']>({
        initialData: props.initialData,
        // the admin runs on the same origin as the website
        serverURL: typeof window === 'undefined' ? '' : window.location.origin,
        depth: LIVE_PREVIEW_DEPTH,
    })
    return render({ ...props, initialData: data } as LivePreviewProps)
}
