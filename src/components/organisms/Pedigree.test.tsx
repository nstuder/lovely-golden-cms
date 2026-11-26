import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pedigreeParents } from '@/test/fixtures'
import { Pedigree } from './Pedigree'

describe('Pedigree', () => {
    it('shows parent images with names next to the table', () => {
        render(<Pedigree {...pedigreeParents} />)
        expect(screen.getByRole('img', { name: 'Alt father' })).toHaveAttribute(
            'sizes',
            '(min-width: 768px) 25vw, 100vw'
        )
        expect(
            screen.getByRole('img', { name: 'Alt mother' })
        ).toBeInTheDocument()
        expect(screen.getByText('Vater Hund', { selector: 'p' })).toBeVisible()
        expect(screen.getByText('Mutter Hund', { selector: 'p' })).toBeVisible()
        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
