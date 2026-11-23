import { toLocalDate } from '@/lib/format'

type Props = {
    title?: string | null
    publishedAt?: string | null
    /** custom target, defaults to /aktuelles */
    link?: string | null
}

/** One line "date + title" in the news box of the home page. */
export const NewsTeaser = ({ title, publishedAt, link }: Props) => (
    <p className="text-center fs-5 mb-0">
        <a href={link || '/aktuelles'} className="link-dark">
            <strong>{toLocalDate(publishedAt)}</strong> {title}
        </a>
    </p>
)
