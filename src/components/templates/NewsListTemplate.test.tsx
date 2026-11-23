import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NewsListTemplate } from './NewsListTemplate'

describe('NewsListTemplate', () => {
    it('shows the news and paginates below /aktuelles', () => {
        render(
            <NewsListTemplate
                news={[{ id: '1', title: 'Eintrag', publishedAt: null }]}
                pagination={{ totalPages: 2, activePage: 1, nextPage: 2 }}
            />
        )
        expect(screen.getByRole('article')).toHaveTextContent('Eintrag')
        expect(
            screen.getByRole('link', { name: 'Nächste Seite' })
        ).toHaveAttribute('href', '/aktuelles/2')
    })
})
