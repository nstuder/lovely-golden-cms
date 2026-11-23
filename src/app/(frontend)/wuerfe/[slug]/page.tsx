import { Image } from '@/components/Image'
import { NewsTimeline } from '@/components/NewsTimeline'
import { Pedigree } from '@/components/Pedigree'
import { RichText } from '@/components/RichText'
import { CmsPage, cmsPageMetadata } from '@/lib/cmsPage'
import { buildMetadata } from '@/lib/metadata'
import { decodeParam, findBySlug } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const load = async ({ params }: Props) => {
    const slug = decodeParam((await params).slug)
    const path = `/wuerfe/${slug}`
    return { path, litter: await findBySlug('litters', slug, path) }
}

export const generateMetadata = async (props: Props) => {
    const { litter, path } = await load(props)
    if (!litter) return cmsPageMetadata(path)
    return buildMetadata({
        metaTitle: litter.name,
        metaDescription: litter.metaDescription || litter.name,
        metaKeywords: litter.metaKeywords,
        image: litter.collage,
        pageUrl: `${process.env.BASE_URL}${litter.slug}`,
    })
}

export default async function LitterPage(props: Props) {
    const { litter, path } = await load(props)
    if (!litter) return <CmsPage path={path} />

    return (
        <>
            <h1>{litter.name}</h1>
            <section className="container-xxl">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <Image image={litter.collage} className="shadow" />
                    </div>
                    <div className="col-md-3">
                        <RichText content={litter.description} />
                    </div>
                </div>
            </section>
            <div className="bg-primary mt-3">
                <ul
                    className="nav nav-tabs font-weight-bold text-white justify-content-center"
                    role="tablist"
                >
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#Ahnentafel"
                        >
                            Ahnentafel
                        </a>
                    </li>
                    {litter.tabs?.map((tab, i) => (
                        <li className="nav-item" key={tab.id ?? i}>
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href={`#${tab.name}`}
                            >
                                {tab.name}
                            </a>
                        </li>
                    ))}
                    {litter.isActive && (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#Gesundheitsergebnisse"
                            >
                                Gesundheitsergebnisse
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            <div className="tab-content">
                <div
                    className="tab-pane active container-fluid"
                    id="Ahnentafel"
                >
                    <h3>Ahnentafel</h3>
                    <Pedigree father={litter.father} mother={litter.mother} />
                </div>
                {litter.tabs?.map((tab, i) => (
                    <div
                        className="tab-pane container"
                        id={tab.name ?? undefined}
                        key={tab.id ?? i}
                    >
                        <h3>{tab.name}</h3>
                        <div className="text-left">
                            <div className="timeline ps-md-0 ps-2">
                                <NewsTimeline news={tab.news} />
                            </div>
                        </div>
                    </div>
                ))}
                {litter.isActive && (
                    <div
                        className="tab-pane container"
                        id="Gesundheitsergebnisse"
                    >
                        <h3>Gesundheitsergebnisse</h3>
                        <div className="table-responsiv">
                            <table className="table table-striped table-bordered table-responsiv border-primary text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>R/H</th>
                                        <th>Gesundheitsergebnisse</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {litter.puppies?.map((puppy, i) => (
                                        <tr key={puppy.id ?? i}>
                                            <td>{puppy.name}</td>
                                            <td>{puppy.gender}</td>
                                            <td>{puppy.health}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
