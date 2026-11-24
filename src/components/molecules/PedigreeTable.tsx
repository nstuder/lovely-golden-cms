import type { Page } from '@/cms/payload-types'

type PedigreeBlock = Extract<
    NonNullable<Page['content']>[number],
    { blockType: 'pedigree' }
>

export type PedigreeParent =
    Partial<PedigreeBlock['father']> | Partial<PedigreeBlock['mother']>

type Props = {
    father?: PedigreeParent | null
    mother?: PedigreeParent | null
}

const ParentRows = ({ parent }: { parent?: PedigreeParent | null }) => (
    <>
        <tr>
            <td className="align-middle" rowSpan={4}>
                {parent?.name}
            </td>
            <td className="align-middle" rowSpan={2}>
                {parent?.grandfather?.name}
            </td>
            <td>{parent?.grandfather?.greatGrandparents?.father}</td>
        </tr>
        <tr>
            <td>{parent?.grandfather?.greatGrandparents?.mother}</td>
        </tr>
        <tr>
            <td className="align-middle" rowSpan={2}>
                {parent?.grandmother?.name}
            </td>
            <td>{parent?.grandmother?.greatGrandparents?.father}</td>
        </tr>
        <tr>
            <td>{parent?.grandmother?.greatGrandparents?.mother}</td>
        </tr>
    </>
)

const Head = ({ parent }: { parent: string }) => (
    <thead>
        <tr>
            <th>{parent}</th>
            <th>Großeltern</th>
            <th>Urgroßeltern</th>
        </tr>
    </thead>
)

/** Three generations of father and mother as table. */
export const PedigreeTable = ({ father, mother }: Props) => (
    <table className="table table-striped table-bordered border-primary text-center">
        <Head parent="Vater" />
        <tbody>
            <ParentRows parent={father} />
        </tbody>
        <Head parent="Mutter" />
        <tbody>
            <ParentRows parent={mother} />
        </tbody>
    </table>
)
