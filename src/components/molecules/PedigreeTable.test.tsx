import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pedigreeParents } from '@/test/fixtures'
import { PedigreeTable } from './PedigreeTable'

describe('PedigreeTable', () => {
    it('shows three generations of both parents', () => {
        render(<PedigreeTable {...pedigreeParents} />)
        for (const name of [
            'Vater Hund',
            'Opa V',
            'Oma V',
            'Uropa VV',
            'Uroma VM',
            'Mutter Hund',
            'Opa M',
            'Uroma MM',
        ]) {
            expect(screen.getByRole('cell', { name })).toBeInTheDocument()
        }
        expect(
            screen.getByRole('cell', { name: 'Vater Hund' })
        ).toHaveAttribute('rowspan', '4')
        expect(screen.getByRole('cell', { name: 'Opa M' })).toHaveAttribute(
            'rowspan',
            '2'
        )
        expect(
            screen
                .getAllByRole('columnheader')
                .filter((th) => ['Vater', 'Mutter'].includes(th.textContent))
        ).toHaveLength(2)
    })

    it('renders empty cells for missing ancestors', () => {
        render(<PedigreeTable father={{ name: 'Nur Vater' }} mother={null} />)
        expect(screen.getAllByRole('cell')).toHaveLength(14)
    })
})
