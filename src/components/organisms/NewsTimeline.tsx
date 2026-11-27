import type { News } from '@/cms/payload-types'
import { toLocalDate } from '@/lib/format'
import { ContentBlocks } from './ContentBlocks'

type NewsEntry = Pick<News, 'title' | 'publishedAt' | 'content'> & {
    id?: string | null
}

/** News entries along a vertical line (/aktuelles and litter tabs). */
export const NewsTimeline = ({ news }: { news?: NewsEntry[] | null }) => (
    <ol className="relative mx-auto max-w-4xl border-l-2 border-plum/70 pl-6 sm:pl-10">
        {news?.map((entry, i) => (
            <li key={entry.id ?? i} className="relative my-8">
                <span
                    className="absolute top-1.5 -left-[33px] size-4 rounded-full border-[3px] border-plum bg-white sm:-left-[49px] sm:size-5"
                    aria-hidden="true"
                />
                <article>
                    <header className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 text-xl">
                        <strong>{entry.title}</strong>
                        <time
                            className="text-base text-plum-dark"
                            dateTime={entry.publishedAt ?? undefined}
                        >
                            {toLocalDate(entry.publishedAt)}
                        </time>
                    </header>
                    <ContentBlocks content={entry.content} />
                </article>
            </li>
        ))}
    </ol>
)
