import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataTable } from './DataTable'

describe('DataTable', () => {
    it('renders headers and rows', () => {
        render(
            <DataTable
                headers={['Name', 'R/H']}
                rows={[
                    { key: '1', cells: ['Anton', 'R'] },
                    { key: '2', cells: ['Berta', 'H'] },
                ]}
            />
        )
        expect(
            screen.getAllByRole('columnheader').map((th) => th.textContent)
        ).toEqual(['Name', 'R/H'])
        const rows = screen.getAllByRole('row').slice(1)
        expect(within(rows[1]).getByText('Berta')).toBeInTheDocument()
        expect(screen.getByRole('table')).toHaveClass(
            'table',
            'table-striped',
            'border-primary'
        )
    })

    it('accepts custom table classes', () => {
        render(<DataTable headers={[]} rows={[]} className="table custom" />)
        expect(screen.getByRole('table')).toHaveAttribute(
            'class',
            'table custom'
        )
    })
})
