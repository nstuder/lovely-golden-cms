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
        <div className="table-responsive">
            <DataTable
                className="table table-striped table-bordered border-primary text-center"
                headers={['Name', 'R/H', 'Gesundheitsergebnisse']}
                rows={(puppies ?? []).map((puppy, i) => ({
                    key: puppy.id ?? String(i),
                    cells: [puppy.name, puppy.gender, puppy.health],
                }))}
            />
        </div>
    </>
)

const litterTabs = (litter: Litter): Tab[] =>
    compactTabs([
        {
            id: 'Ahnentafel',
            label: 'Ahnentafel',
            className: 'container-fluid',
            content: (
                <>
                    <h3>Ahnentafel</h3>
                    <Pedigree father={litter.father} mother={litter.mother} />
                </>
            ),
        },
        ...(litter.tabs ?? []).map((tab) => ({
            id: tab.name,
            label: tab.name,
            className: 'container',
            content: (
                <>
                    <h3>{tab.name}</h3>
                    <div className="text-left">
                        <div className="timeline ps-md-0 ps-2">
                            <NewsTimeline news={tab.news} />
                        </div>
                    </div>
                </>
            ),
        })),
        litter.isActive && {
            id: 'Gesundheitsergebnisse',
            label: 'Gesundheitsergebnisse',
            className: 'container',
            content: <HealthResults puppies={litter.puppies} />,
        },
    ])

/** /wuerfe/<name>: collage, description and tabs of one litter. */
export const LitterDetailTemplate = ({ litter }: { litter: Litter }) => (
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
        <Tabs
            tabs={litterTabs(litter)}
            navClassName="nav nav-tabs font-weight-bold text-white justify-content-center"
            navRole="tablist"
        />
    </>
)
