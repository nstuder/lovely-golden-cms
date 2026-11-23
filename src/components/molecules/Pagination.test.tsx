import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
    it('links all pages and highlights the active one', () => {
        render(
            <Pagination
                totalPages={3}
                activePage={2}
                prevPage={1}
                nextPage={3}
                basePath="/aktuelles"
            />
        )
        const page2 = screen.getByRole('link', { name: 'Seite 2' })
        expect(page2).toHaveAttribute('href', '/aktuelles/2')
        expect(page2).toHaveAttribute('aria-current', 'true')
        expect(page2.parentElement).toHaveClass('active')
        expect(screen.getByRole('link', { name: 'Seite 1' })).toHaveAttribute(
            'aria-current',
            'false'
        )
        expect(
            screen.getByRole('link', { name: 'Vorherige Seite' })
        ).toHaveAttribute('href', '/aktuelles/1')
        expect(
            screen.getByRole('link', { name: 'Nächste Seite' })
        ).toHaveAttribute('href', '/aktuelles/3')
    })

    it('hides the arrows on the first and last page', () => {
        render(
            <Pagination
                totalPages={1}
                prevPage={null}
                nextPage={null}
                basePath="/aktuelles"
            />
        )
        expect(screen.getAllByRole('link')).toHaveLength(1)
        expect(screen.getByRole('link', { name: 'Seite 1' })).toHaveAttribute(
            'aria-current',
            'false'
        )
    })
})
