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
        <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="hidden flex-col gap-3 md:col-span-4 md:flex">
                {dog.images?.map((item, i) => (
                    <Image
                        key={item.id ?? i}
                        image={item.image}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="w-full rounded-lg shadow-lg"
                    />
                ))}
            </div>
            <div className="md:col-span-8">
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
            className: 'container-full',
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
            className: 'container-wide',
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
            className: 'container-wide',
            content: <ShowResults dog={dog} />,
        },
        dog.isExamsActive && {
            id: 'Prüfungen',
            label: 'Prüfungen',
            className: 'container-page',
            content: <RichText content={dog.textExams} />,
        },
        dog.isBreedActive && {
            id: 'Nachzucht',
            label: 'Nachzucht',
            className: 'container-page',
            content: (
                <>
                    <h3>Nachzucht</h3>
                    <ContentBlocks content={dog.content} />
                </>
            ),
        },
    ])

const PORTRAIT = 'w-full rounded-xl shadow-lg'

/** /hunde/<name>: images, description and tabs of one dog. */
export const DogDetailTemplate = ({ dog }: { dog: Dog }) => (
    <>
        <section className="container-wide">
            <h1>{dog.name}</h1>
            {/* mobile: head image, text, stand image; from md: images left, text right */}
            <div className="grid gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-10">
                <Image
                    image={dog.headImage}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`${PORTRAIT} md:col-start-1 md:row-start-1`}
                />
                <div className="md:col-start-2 md:row-span-2 md:row-start-1">
                    <h2>{dog.breedingName}</h2>
                    <RichText content={dog.description} />
                </div>
                <Image
                    image={dog.standImage}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`${PORTRAIT} md:col-start-1 md:row-start-2 md:self-start`}
                />
            </div>
        </section>
        <Tabs tabs={dogTabs(dog)} />
    </>
)
