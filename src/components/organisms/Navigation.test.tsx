import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Navigation } from './Navigation'

describe('Navigation', () => {
    it('renders links and sub menus', () => {
        render(
            <Navigation
                items={[
                    {
                        id: '1',
                        type: 'link',
                        label: 'Startseite',
                        linkType: 'internal',
                        pageIntern: {
                            relationTo: 'pages',
                            value: { slug: '/start' } as never,
                        },
                    },
                    {
                        id: '2',
                        type: 'link',
                        label: 'VDH',
                        linkType: 'external',
                        pageExtern: 'https://vdh.de',
                    },
                    {
                        id: '3',
                        type: 'subMenu',
                        label: 'Hunde',
                        subMenu: {
                            items: [
                                {
                                    id: '4',
                                    label: 'Alle Hunde',
                                    linkType: 'external',
                                    slugExtern: '/hunde',
                                },
                            ],
                        },
                    },
                ]}
            />
        )
        expect(
            screen.getByRole('link', { name: 'Startseite' })
        ).toHaveAttribute('href', '/start')
        expect(screen.getByRole('link', { name: 'VDH' })).toHaveAttribute(
            'href',
            'https://vdh.de'
        )
        expect(
            screen.getByRole('button', { name: 'Hunde' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: 'Alle Hunde' })
        ).toHaveAttribute('href', '/hunde')
    })

    it('always has the skip link, logo and toggler', () => {
        render(<Navigation items={null} />)
        expect(
            screen.getByRole('link', { name: 'Navigation überspringen' })
        ).toHaveAttribute('href', '#inhalt')
        expect(
            screen.getByRole('link', { name: 'Moments of Love Logo - Home' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Toggle navigation' })
        ).toHaveAttribute('data-bs-target', '#mainnav')
    })

    it('ignores entries without type', () => {
        render(
            <Navigation items={[{ id: '1', label: 'Kaputt', type: null }]} />
        )
        expect(screen.queryByText('Kaputt')).not.toBeInTheDocument()
    })
})
