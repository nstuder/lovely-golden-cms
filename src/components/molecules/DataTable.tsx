import type { ReactNode } from 'react'

type Row = { key: string; cells: ReactNode[] }

type Props = {
    headers: string[]
    rows: Row[]
    className?: string
}

const DEFAULT_CLASS =
    'table table-striped table-bordered border-primary text-center'

/** Striped table with a header row (show results, health results). */
export const DataTable = ({
    headers,
    rows,
    className = DEFAULT_CLASS,
}: Props) => (
    <table className={className}>
        <thead>
            <tr>
                {headers.map((header) => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr key={row.key}>
                    {row.cells.map((cell, i) => (
                        <td key={i}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)
