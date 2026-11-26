import { NewsListTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { find } from '@/lib/payload'

export const NEWS_LIMIT = 10

export const newsMetadata = () =>
    buildMetadata({
        metaTitle: 'Aktuelles',
        metaDescription: 'Aktuelles',
        pageUrl: `${process.env.BASE_URL}/aktuelles`,
    })

/** Paginated news list for /aktuelles and /aktuelles/<page>. */
export const NewsPage = async ({ page }: { page?: number }) => {
    const news = await find({
        collection: 'news',
        sort: '-publishedAt',
        page: page ?? 1,
        limit: NEWS_LIMIT,
    })

    return (
        <NewsListTemplate
            news={news.docs}
            pagination={{
                totalPages: news.totalPages,
                // the first page (/aktuelles) never highlighted the active page
                activePage: page !== undefined ? news.page : undefined,
                prevPage: news.prevPage,
                nextPage: news.nextPage,
            }}
        />
    )
}
