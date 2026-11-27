import type { ReactNode } from 'react'

type Row = { key: string; cells: ReactNode[] }

type Props = {
    headers: string[]
    rows: Row[]
}

/** Shared look of all tables (results, pedigree). */
export const TABLE_CLASS =
    'w-full border-collapse overflow-hidden rounded-lg bg-white/70 text-center shadow-sm'
export const TH_CLASS = 'bg-plum px-3 py-2 font-semibold text-white'
export const TD_CLASS = 'border border-plum/20 px-3 py-2 align-middle'
export const TR_CLASS = 'even:bg-plum-light/60'

/** Striped table with a header row (show results, health results). */
export const DataTable = ({ headers, rows }: Props) => (
    <div className="overflow-x-auto">
        <table className={TABLE_CLASS}>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header} className={TH_CLASS}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.key} className={TR_CLASS}>
                        {row.cells.map((cell, i) => (
                            <td key={i} className={TD_CLASS}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
