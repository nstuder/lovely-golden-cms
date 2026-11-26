import type { Dog } from '@/cms/payload-types'
import { Image } from '@/components/atoms'
import { DataTable, RichText } from '@/components/molecules'
import {
    ContentBlocks,
    Gallery,
    Pedigree,
    Tabs,
    compactTabs,
    type Tab,
} from '@/components/organisms'
import { toLocalDate } from '@/lib/format'

const ShowResults = ({ dog }: { dog: Dog }) => (
    <>
        <h3>Ausstellungsergebnisse</h3>
        <div className="row align-items-center">
            <div className="col-md-4 d-md-block d-none">
                {dog.images?.map((item, i) => (
                    <Image
                        key={item.id ?? i}
                        image={item.image}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="shadow w-100 mb-2"
                    />
                ))}
            </div>
            <div className="table-responsive col-md-8">
                <DataTable
                    headers={['Ort', 'Datum', 'Klasse', 'Beurteilung']}
                    rows={(dog.shows ?? []).map((show, i) => ({
                        key: show.id ?? String(i),
                        cells: [
                            show.location,
                            toLocalDate(show.date),
                            show.class,
                            show.result,
                        ],
                    }))}
                />
            </div>
        </div>
    </>
)

const dogTabs = (dog: Dog): Tab[] =>
    compactTabs([
        {
            id: 'Galerie',
            label: 'Galerie',
            className: 'container-fluid',
            content: (
                <>
                    <h3>Galerie</h3>
                    <Gallery images={dog.gallery} />
                </>
            ),
        },
        {
            id: 'Ahnentafel',
            label: 'Ahnentafel',
            className: 'container-xxl',
            content: (
                <>
                    <h3>Ahnentafel</h3>
                    <Pedigree father={dog.father} mother={dog.mother} />
                </>
            ),
        },
        dog.isShowsActive && {
            id: 'Ausstellungsergebnisse',
            label: 'Ausstellungsergebnisse',
            className: 'container-xxl',
            content: <ShowResults dog={dog} />,
        },
        dog.isExamsActive && {
            id: 'Prüfungen',
            label: 'Prüfungen',
            className: 'container',
            content: <RichText content={dog.textExams} />,
        },
        dog.isBreedActive && {
            id: 'Nachzucht',
            label: 'Nachzucht',
            className: 'container',
            content: (
                <>
                    <h3>Nachzucht</h3>
                    <ContentBlocks content={dog.content} />
                </>
            ),
        },
    ])

/** /hunde/<name>: images, description and tabs of one dog. */
export const DogDetailTemplate = ({ dog }: { dog: Dog }) => (
    <>
        <section className="container-xxl">
            <h1>{dog.name}</h1>
            <div className="row">
                <div className="col-md-6 d-md-block d-none">
                    <Image
                        image={dog.headImage}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="mb-2 shadow w-100"
                    />
                    <Image
                        image={dog.standImage}
                        sizes="(min-width: 768px) 50vw, 100vw"
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
        <Tabs
            tabs={dogTabs(dog)}
            navClassName="nav nav-tabs font-weight-bold justify-content-center"
        />
    </>
)
