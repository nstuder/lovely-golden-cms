import { fireEvent, render, screen } from '@testing-library/react'
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
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
        fireEvent.click(toggle)
        expect(toggle).toHaveAttribute('aria-expanded', 'true')
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

    it('closes on Escape and on clicks outside', () => {
        render(
            <>
                <p>Draussen</p>
                <ul>
                    <NavDropdown label="Zucht" items={[]} />
                </ul>
            </>
        )
        const toggle = screen.getByRole('button', { name: 'Zucht' })
        const menu = document.getElementById(
            toggle.getAttribute('aria-controls')!
        )
        expect(menu).not.toBeVisible()
        fireEvent.click(toggle)
        expect(menu).toBeVisible()
        fireEvent.keyDown(document, { key: 'Escape' })
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
        fireEvent.click(toggle)
        fireEvent.click(screen.getByText('Draussen'))
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })
})
