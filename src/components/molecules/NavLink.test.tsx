import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NavLink } from './NavLink'

describe('NavLink', () => {
    it('renders a navigation entry', () => {
        render(<NavLink label="Kontakt" href="/kontakt" />)
        expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
            'href',
            '/kontakt'
        )
        expect(screen.getByRole('listitem')).toHaveClass('nav-item')
    })
})
