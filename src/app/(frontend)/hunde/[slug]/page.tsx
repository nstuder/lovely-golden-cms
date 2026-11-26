import { CmsPage, cmsPageMetadata } from '@/components/pages'
import { DogDetailTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { decodeParam, findBySlugOrRedirect } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const load = async ({ params }: Props) => {
    const slug = decodeParam((await params).slug)
    const path = `/hunde/${slug}`
    return { path, dog: await findBySlugOrRedirect('dogs', path) }
}

export const generateMetadata = async (props: Props) => {
    const { dog, path } = await load(props)
    if (!dog) return cmsPageMetadata(path)
    return buildMetadata({
        metaTitle: `${dog.breedingName} - ${dog.name}`,
        metaDescription: dog.metaDescription,
        metaKeywords: dog.metaKeywords,
        image: dog.teaserImage,
        pageUrl: `${process.env.BASE_URL}${dog.slug}`,
    })
}

export default async function DogPage(props: Props) {
    const { dog, path } = await load(props)
    if (!dog) return <CmsPage path={path} />

    return <DogDetailTemplate dog={dog} />
}
