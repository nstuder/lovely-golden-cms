import type { Page } from '@/cms/payload-types'
import { TABLE_CLASS, TD_CLASS, TH_CLASS } from './DataTable'

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
            <td className={`${TD_CLASS} font-semibold`} rowSpan={4}>
                {parent?.name}
            </td>
            <td className={TD_CLASS} rowSpan={2}>
                {parent?.grandfather?.name}
            </td>
            <td className={TD_CLASS}>
                {parent?.grandfather?.greatGrandparents?.father}
            </td>
        </tr>
        <tr>
            <td className={TD_CLASS}>
                {parent?.grandfather?.greatGrandparents?.mother}
            </td>
        </tr>
        <tr>
            <td className={TD_CLASS} rowSpan={2}>
                {parent?.grandmother?.name}
            </td>
            <td className={TD_CLASS}>
                {parent?.grandmother?.greatGrandparents?.father}
            </td>
        </tr>
        <tr>
            <td className={TD_CLASS}>
                {parent?.grandmother?.greatGrandparents?.mother}
            </td>
        </tr>
    </>
)

const Head = ({ parent }: { parent: string }) => (
    <thead>
        <tr>
            <th className={TH_CLASS}>{parent}</th>
            <th className={TH_CLASS}>Großeltern</th>
            <th className={TH_CLASS}>Urgroßeltern</th>
        </tr>
    </thead>
)

/** Three generations of father and mother as table. */
export const PedigreeTable = ({ father, mother }: Props) => (
    <table className={TABLE_CLASS}>
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
