import type { ComponentProps } from 'react'
import { Pagination } from '@/components/molecules'
import { NewsTimeline } from '@/components/organisms'

type Props = {
    news: ComponentProps<typeof NewsTimeline>['news']
    pagination: Omit<ComponentProps<typeof Pagination>, 'basePath'>
}

/** /aktuelles: news timeline with pagination. */
export const NewsListTemplate = ({ news, pagination }: Props) => (
    <section className="container-page">
        <h1>Aktuelles</h1>
        <NewsTimeline news={news} />
        <Pagination {...pagination} basePath="/aktuelles" />
    </section>
)
