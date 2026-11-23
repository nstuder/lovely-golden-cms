import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { compactTabs, Tabs } from './Tabs'

describe('Tabs', () => {
    it('renders the tab bar and panes, the first one active', () => {
        const { container } = render(
            <Tabs
                navClassName="nav nav-tabs"
                navRole="tablist"
                tabs={[
                    {
                        id: 'Galerie',
                        label: 'Galerie',
                        className: 'container-fluid',
                        content: <p>Bilder</p>,
                    },
                    {
                        id: 'Ahnentafel',
                        label: 'Ahnentafel',
                        content: 'Tabelle',
                    },
                ]}
            />
        )
        expect(screen.getByRole('tablist')).toHaveClass('nav', 'nav-tabs')
        expect(screen.getByRole('link', { name: 'Galerie' })).toHaveClass(
            'active'
        )
        expect(
            screen.getByRole('link', { name: 'Ahnentafel' })
        ).not.toHaveClass('active')

        const panes = container.querySelectorAll('.tab-content > .tab-pane')
        expect(panes).toHaveLength(2)
        expect(panes[0]).toHaveAttribute('id', 'Galerie')
        expect(panes[0]).toHaveAttribute(
            'class',
            'tab-pane active container-fluid'
        )
        expect(panes[0]).toHaveTextContent('Bilder')
        expect(panes[1]).toHaveAttribute('class', 'tab-pane')
    })
})

describe('compactTabs', () => {
    it('drops disabled tabs', () => {
        const tab = { id: 'a', label: 'A', content: null }
        expect(compactTabs([tab, false, null, undefined])).toEqual([tab])
    })
})
