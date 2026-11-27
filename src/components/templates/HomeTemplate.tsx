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
        <section className="container-page text-center">
            <RichText content={home.content} />
        </section>
        <section className="container-page mt-12 max-w-3xl">
            <h3>Aktuelles</h3>
            <ul className="divide-y divide-plum/15 rounded-xl bg-white/60 shadow-sm">
                {news.map((entry) => (
                    <NewsTeaser
                        key={entry.id}
                        title={entry.title}
                        publishedAt={entry.publishedAt}
                        link={entry.link}
                    />
                ))}
            </ul>
        </section>
    </>
)
