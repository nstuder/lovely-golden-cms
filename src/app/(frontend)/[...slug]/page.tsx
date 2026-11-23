import { CmsPage, cmsPageMetadata } from '@/components/pages'
import { decodeParam } from '@/lib/payload'

type Props = { params: Promise<{ slug: string[] }> }

const toPath = async ({ params }: Props) =>
    '/' + (await params).slug.map(decodeParam).join('/')

export const generateMetadata = async (props: Props) =>
    cmsPageMetadata(await toPath(props))

export default async function Page(props: Props) {
    return <CmsPage path={await toPath(props)} />
}
