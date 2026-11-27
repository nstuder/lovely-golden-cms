import type { Litter } from '@/cms/payload-types'
import { Image } from '@/components/atoms'
import { DataTable, RichText } from '@/components/molecules'
import {
    NewsTimeline,
    Pedigree,
    Tabs,
    compactTabs,
    type Tab,
} from '@/components/organisms'

const HealthResults = ({ puppies }: { puppies: Litter['puppies'] }) => (
    <>
        <h3>Gesundheitsergebnisse</h3>
        <DataTable
            headers={['Name', 'R/H', 'Gesundheitsergebnisse']}
            rows={(puppies ?? []).map((puppy, i) => ({
                key: puppy.id ?? String(i),
                cells: [puppy.name, puppy.gender, puppy.health],
            }))}
        />
    </>
)

const litterTabs = (litter: Litter): Tab[] =>
    compactTabs([
        {
            id: 'Ahnentafel',
            label: 'Ahnentafel',
            className: 'container-wide',
            content: (
                <>
                    <h3>Ahnentafel</h3>
                    <Pedigree father={litter.father} mother={litter.mother} />
                </>
            ),
        },
        // a tab without name has no id to switch to
        ...(litter.tabs ?? []).map(
            (tab) =>
                !!tab.name && {
                    id: tab.name,
                    label: tab.name,
                    className: 'container-page',
                    content: (
                        <>
                            <h3>{tab.name}</h3>
                            <NewsTimeline news={tab.news} />
                        </>
                    ),
                }
        ),
        litter.isActive && {
            id: 'Gesundheitsergebnisse',
            label: 'Gesundheitsergebnisse',
            className: 'container-page',
            content: <HealthResults puppies={litter.puppies} />,
        },
    ])

/** /wuerfe/<name>: collage, description and tabs of one litter. */
export const LitterDetailTemplate = ({ litter }: { litter: Litter }) => (
    <>
        <h1>{litter.name}</h1>
        <section className="container-wide">
            <div className="grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                    <Image
                        image={litter.collage}
                        sizes="(min-width: 768px) 67vw, 100vw"
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>
                <div className="md:col-span-4">
                    <RichText content={litter.description} />
                </div>
            </div>
        </section>
        <Tabs tabs={litterTabs(litter)} />
    </>
)
