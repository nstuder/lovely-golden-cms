import type { ComponentProps } from 'react'
import { Pagination } from '@/components/molecules'
import { NewsTimeline } from '@/components/organisms'

type Props = {
    news: ComponentProps<typeof NewsTimeline>['news']
    pagination: Omit<ComponentProps<typeof Pagination>, 'basePath'>
}

/** /aktuelles: news timeline with pagination. */
export const NewsListTemplate = ({ news, pagination }: Props) => (
    <>
        <h1>Aktuelles</h1>
        <div className="timeline ps-md-0 ps-2 container">
            <NewsTimeline news={news} />
        </div>
        <Pagination {...pagination} basePath="/aktuelles" />
    </>
)
