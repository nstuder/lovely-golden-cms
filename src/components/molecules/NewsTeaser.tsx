import { toLocalDate } from '@/lib/format'

type Props = {
    title?: string | null
    publishedAt?: string | null
    /** custom target, defaults to /aktuelles */
    link?: string | null
}

/** One line "date + title" in the news box of the home page. */
export const NewsTeaser = ({ title, publishedAt, link }: Props) => (
    <li>
        <a
            href={link || '/aktuelles'}
            className="flex flex-col gap-x-4 rounded-lg px-4 py-3 transition-colors hover:bg-plum-light sm:flex-row sm:items-baseline"
        >
            <strong className="shrink-0 text-plum-dark">
                {toLocalDate(publishedAt)}
            </strong>
            <span>{title}</span>
        </a>
    </li>
)
