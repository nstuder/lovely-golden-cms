import type { News } from '@/cms/payload-types'
import { toLocalDate } from '@/lib/format'
import { ContentBlocks } from './ContentBlocks'

type NewsEntry = Pick<News, 'title' | 'publishedAt' | 'content'> & {
    id?: string | null
}

/** List of news entries as used on /aktuelles and in litter tabs. */
export const NewsTimeline = ({ news }: { news?: NewsEntry[] | null }) => (
    <>
        {news?.map((entry, i) => (
            <article key={entry.id ?? i}>
                <div className="my-2 fs-5">
                    <strong className="d-inline">{entry.title}</strong>
                    <p className="d-inline float-end text-primary">
                        {toLocalDate(entry.publishedAt)}
                    </p>
                </div>
                <ContentBlocks content={entry.content} />
            </article>
        ))}
    </>
)
