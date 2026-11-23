import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pedigreeParents } from '@/test/fixtures'
import { Pedigree } from './Pedigree'

describe('Pedigree', () => {
    it('shows parent images with names next to the table', () => {
        render(<Pedigree {...pedigreeParents} />)
        // desktop + mobile variant per parent
        expect(screen.getAllByRole('img', { name: 'Alt father' })).toHaveLength(
            2
        )
        expect(screen.getAllByRole('img', { name: 'Alt mother' })).toHaveLength(
            2
        )
        expect(screen.getByText('Vater Hund', { selector: 'p' })).toBeVisible()
        expect(screen.getByText('Mutter Hund', { selector: 'p' })).toBeVisible()
        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
