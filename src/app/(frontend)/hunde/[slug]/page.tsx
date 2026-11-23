import { ContentBlocks } from '@/components/ContentBlocks'
import { Gallery } from '@/components/Gallery'
import { Image } from '@/components/Image'
import { Pedigree } from '@/components/Pedigree'
import { RichText } from '@/components/RichText'
import { CmsPage, cmsPageMetadata } from '@/lib/cmsPage'
import { toLocalDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { decodeParam, findBySlug } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

const load = async ({ params }: Props) => {
    const slug = decodeParam((await params).slug)
    const path = `/hunde/${slug}`
    return { path, dog: await findBySlug('dogs', slug, path) }
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

    return (
        <>
            <section className="container-xxl">
                <h1>{dog.name}</h1>
                <div className="row">
                    <div className="col-md-6 d-md-block d-none">
                        <Image
                            image={dog.headImage}
                            className="mb-2 shadow w-100"
                        />
                        <Image
                            image={dog.standImage}
                            className="shadow w-100"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{dog.breedingName}</h2>
                        <Image
                            image={dog.headImage}
                            className="d-block d-md-none mb-2 shadow w-100"
                        />
                        <RichText content={dog.description} />
                        <Image
                            image={dog.standImage}
                            className="d-block d-md-none shadow w-100"
                        />
                    </div>
                </div>
            </section>
            <div className="bg-primary mt-3">
                <ul className="nav nav-tabs font-weight-bold justify-content-center">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#Galerie"
                        >
                            Galerie
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#Ahnentafel"
                        >
                            Ahnentafel
                        </a>
                    </li>
                    {dog.isShowsActive && (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#Ausstellungsergebnisse"
                            >
                                Ausstellungsergebnisse
                            </a>
                        </li>
                    )}
                    {dog.isExamsActive && (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#Prüfungen"
                            >
                                Prüfungen
                            </a>
                        </li>
                    )}
                    {dog.isBreedActive && (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#Nachzucht"
                            >
                                Nachzucht
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            <div className="tab-content">
                <div className="tab-pane active container-fluid" id="Galerie">
                    <h3>Galerie</h3>
                    <Gallery images={dog.gallery} />
                </div>
                <div className="tab-pane container-xxl" id="Ahnentafel">
                    <h3>Ahnentafel</h3>
                    <Pedigree father={dog.father} mother={dog.mother} />
                </div>
                {dog.isShowsActive && (
                    <div
                        className="tab-pane container-xxl"
                        id="Ausstellungsergebnisse"
                    >
                        <h3>Ausstellungsergebnisse</h3>
                        <div className="row align-items-center">
                            <div className="col-md-4 d-md-block d-none">
                                {dog.images?.map((item, i) => (
                                    <Image
                                        key={item.id ?? i}
                                        image={item.image}
                                        className="shadow w-100 mb-2"
                                    />
                                ))}
                            </div>
                            <div className="table-responsive col-md-8">
                                <table className="table table-striped table-bordered border-primary text-center">
                                    <thead>
                                        <tr>
                                            <th>Ort</th>
                                            <th>Datum</th>
                                            <th>Klasse</th>
                                            <th>Beurteilung</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dog.shows?.map((show, i) => (
                                            <tr key={show.id ?? i}>
                                                <td>{show.location}</td>
                                                <td>
                                                    {toLocalDate(show.date)}
                                                </td>
                                                <td>{show.class}</td>
                                                <td>{show.result}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {dog.isExamsActive && (
                    <div className="tab-pane container" id="Prüfungen">
                        <RichText content={dog.textExams} />
                    </div>
                )}
                {dog.isBreedActive && (
                    <div className="tab-pane container" id="Nachzucht">
                        <h3>Nachzucht</h3>
                        <ContentBlocks content={dog.content} />
                    </div>
                )}
            </div>
        </>
    )
}
