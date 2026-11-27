import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { compactTabs } from './tab'
import { Tabs } from './Tabs'

const tabs = [
    {
        id: 'Galerie',
        label: 'Galerie',
        className: 'container-full',
        content: <p>Bilder</p>,
    },
    { id: 'Ahnentafel', label: 'Ahnentafel', content: 'Tabelle' },
    { id: 'Prüfungen', label: 'Prüfungen', content: 'Ergebnisse' },
]

describe('Tabs', () => {
    afterEach(() => history.replaceState(null, '', '/'))

    it('shows the first tab, the other panels are hidden', () => {
        render(<Tabs tabs={tabs} />)
        expect(screen.getByRole('tab', { name: 'Galerie' })).toHaveAttribute(
            'aria-selected',
            'true'
        )
        const panel = screen.getByRole('tabpanel')
        expect(panel).toHaveAttribute('id', 'Galerie')
        expect(panel).toHaveClass('container-full')
        expect(panel).toHaveTextContent('Bilder')
        expect(screen.getByText('Tabelle')).not.toBeVisible()
    })

    it('switches on click and keeps the tab in the URL hash', () => {
        render(<Tabs tabs={tabs} />)
        fireEvent.click(screen.getByRole('tab', { name: 'Ahnentafel' }))
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Tabelle')
        expect(window.location.hash).toBe('#Ahnentafel')
    })

    it('opens the tab named in the URL hash', () => {
        history.replaceState(null, '', '/#Pr%C3%BCfungen')
        render(<Tabs tabs={tabs} />)
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Ergebnisse')
    })

    it('ignores unknown hashes', () => {
        history.replaceState(null, '', '/#inhalt')
        render(<Tabs tabs={tabs} />)
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Bilder')
    })

    it('moves between tabs with the arrow keys', () => {
        render(<Tabs tabs={tabs} />)
        const first = screen.getByRole('tab', { name: 'Galerie' })
        fireEvent.keyDown(first, { key: 'ArrowLeft' })
        const last = screen.getByRole('tab', { name: 'Prüfungen' })
        expect(last).toHaveAttribute('aria-selected', 'true')
        expect(last).toHaveFocus()
        expect(first).toHaveAttribute('tabindex', '-1')
    })
})

describe('compactTabs', () => {
    it('drops disabled tabs', () => {
        const tab = { id: 'a', label: 'A', content: null }
        expect(compactTabs([tab, false, null, undefined])).toEqual([tab])
    })
})
