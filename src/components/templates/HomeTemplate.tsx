import type { Home, News } from '@/cms/payload-types'
import { NewsTeaser, RichText } from '@/components/molecules'

type Props = {
    home: Pick<Home, 'title' | 'content'>
    news: Pick<News, 'id' | 'title' | 'publishedAt' | 'link'>[]
}

/** Home page: intro text + latest news. */
export const HomeTemplate = ({ home, news }: Props) => (
    <>
        <h1>{home.title}</h1>
        <section className="container">
            <RichText content={home.content} />
            <h3 className="mt-5">Aktuelles</h3>
            {news.map((entry) => (
                <NewsTeaser
                    key={entry.id}
                    title={entry.title}
                    publishedAt={entry.publishedAt}
                    link={entry.link}
                />
            ))}
        </section>
    </>
)
