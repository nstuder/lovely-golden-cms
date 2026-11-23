import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NavDropdown } from './NavDropdown'

describe('NavDropdown', () => {
    it('renders the toggle and resolves internal and external links', () => {
        render(
            <NavDropdown
                label="Hunde"
                items={[
                    {
                        id: '1',
                        label: 'Summer',
                        linkType: 'internal',
                        slugIntern: {
                            relationTo: 'dogs',
                            value: { slug: '/hunde/summer' } as never,
                        },
                    },
                    {
                        id: '2',
                        label: 'VDH',
                        linkType: 'external',
                        slugExtern: 'https://vdh.de',
                    },
                    {
                        id: '3',
                        label: 'Nicht geladen',
                        linkType: 'internal',
                        slugIntern: { relationTo: 'dogs', value: 'abc' },
                    },
                ]}
            />
        )
        const toggle = screen.getByRole('button', { name: 'Hunde' })
        expect(toggle).toHaveAttribute('data-bs-toggle', 'dropdown')
        expect(toggle).toHaveAttribute('id', 'navbarDropdown-Hunde')
        expect(screen.getByRole('link', { name: 'Summer' })).toHaveAttribute(
            'href',
            '/hunde/summer'
        )
        expect(screen.getByRole('link', { name: 'VDH' })).toHaveAttribute(
            'href',
            'https://vdh.de'
        )
        expect(screen.getByText('Nicht geladen')).not.toHaveAttribute('href')
    })
})
