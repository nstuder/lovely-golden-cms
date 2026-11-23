import { CmsPage, cmsPageMetadata } from '@/lib/cmsPage'
import { NewsPage, newsMetadata } from '@/lib/newsPage'
import { decodeParam } from '@/lib/payload'

type Props = { params: Promise<{ page: string }> }

const parsePage = async ({ params }: Props) => {
    const raw = decodeParam((await params).page)
    const page = /^\d+$/.test(raw) ? parseInt(raw, 10) : NaN
    return { page: page > 0 ? page : undefined, path: `/aktuelles/${raw}` }
}

export const generateMetadata = async (props: Props) => {
    const { page, path } = await parsePage(props)
    return page ? newsMetadata() : cmsPageMetadata(path)
}

export default async function NewsPaginated(props: Props) {
    const { page, path } = await parsePage(props)
    return page ? <NewsPage page={page} /> : <CmsPage path={path} />
}
