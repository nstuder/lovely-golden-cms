import { ContentBlocks, type Block } from '@/components/organisms'

type Props = {
    title?: string | null
    content?: Block[] | null
}

/** Generic CMS page: title + content blocks. */
export const ContentPageTemplate = ({ title, content }: Props) => (
    <section className="container-page">
        <h1>{title}</h1>
        <ContentBlocks content={content} />
    </section>
)
