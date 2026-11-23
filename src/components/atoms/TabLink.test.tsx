import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TabLink } from './TabLink'

describe('TabLink', () => {
    it('links to the tab pane', () => {
        render(<TabLink target="Ahnentafel" label="Ahnentafel" active />)
        const link = screen.getByRole('link', { name: 'Ahnentafel' })
        expect(link).toHaveAttribute('href', '#Ahnentafel')
        expect(link).toHaveAttribute('data-bs-toggle', 'tab')
        expect(link).toHaveClass('nav-link', 'active')
    })

    it('is inactive by default', () => {
        render(<TabLink target="Galerie" label="Galerie" />)
        expect(screen.getByRole('link')).not.toHaveClass('active')
    })
})
