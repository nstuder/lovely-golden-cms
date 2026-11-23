import { NewsTimeline } from '@/components/NewsTimeline'
import { buildMetadata } from './metadata'
import { getClient, LOCALE } from './payload'

const NEWS_LIMIT = 10

export const newsMetadata = () =>
    buildMetadata({
        metaTitle: 'Aktuelles',
        metaDescription: 'Aktuelles',
        pageUrl: `${process.env.BASE_URL}/aktuelles`,
    })

/** Paginated news list for /aktuelles and /aktuelles/<page>. */
export const NewsPage = async ({ page }: { page?: number }) => {
    const payload = await getClient()
    const news = await payload.find({
        collection: 'news',
        locale: LOCALE,
        sort: '-publishedAt',
        page: page ?? 1,
        limit: NEWS_LIMIT,
    })
    const pages = Array.from({ length: news.totalPages }, (_, index) => ({
        // the first page (/aktuelles) never highlighted the active page
        isActive: page !== undefined && index + 1 === news.page,
        number: index + 1,
    }))

    return (
        <>
            <h1>Aktuelles</h1>
            <div className="timeline ps-md-0 ps-2 container">
                <NewsTimeline news={news.docs} />
            </div>
            <nav aria-label="Seiten Navigation">
                <ul className="pagination justify-content-center">
                    {news.prevPage && (
                        <li className="page-item">
                            <a
                                className="page-link"
                                href={`/aktuelles/${news.prevPage}`}
                                aria-label="Vorherige Seite"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                    )}
                    {pages.map(({ isActive, number }) => (
                        <li
                            key={number}
                            className={`page-item ${isActive ? 'active' : ''}`}
                        >
                            <a
                                className="page-link"
                                href={`/aktuelles/${number}`}
                                aria-label={`Seite ${number}`}
                                aria-current={isActive ? 'true' : 'false'}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                    {news.nextPage && (
                        <li className="page-item">
                            <a
                                className="page-link"
                                href={`/aktuelles/${news.nextPage}`}
                                aria-label="Nächste Seite"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}
