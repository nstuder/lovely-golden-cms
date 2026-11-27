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
        expect(page2).toHaveAttribute('aria-current', 'page')
        expect(page2).toHaveClass('bg-plum', 'text-white')
        expect(
            screen.getByRole('link', { name: 'Seite 1' })
        ).not.toHaveAttribute('aria-current')
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
        expect(
            screen.getByRole('link', { name: 'Seite 1' })
        ).not.toHaveAttribute('aria-current')
    })
})
