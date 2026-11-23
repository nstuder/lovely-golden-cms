import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { litter } from '@/test/fixtures'
import { LitterDetailTemplate } from './LitterDetailTemplate'

const tabLabels = () =>
    screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('data-bs-toggle') === 'tab')
        .map((link) => link.textContent)

describe('LitterDetailTemplate', () => {
    it('shows name, collage and description with the pedigree tab', () => {
        render(<LitterDetailTemplate litter={litter()} />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'A-Wurf' })
        ).toBeInTheDocument()
        expect(screen.getByRole('img', { name: 'Alt collage' })).toBeVisible()
        expect(screen.getByText('Unser erster Wurf')).toBeInTheDocument()
        expect(tabLabels()).toEqual(['Ahnentafel'])
        expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('adds custom news tabs and health results', () => {
        render(
            <LitterDetailTemplate
                litter={litter({
                    tabs: [
                        {
                            id: 't1',
                            name: '1. Woche',
                            news: [
                                {
                                    id: 'n1',
                                    title: 'Geburt',
                                    publishedAt: '2024-05-01T08:00:00Z',
                                },
                            ],
                        },
                    ],
                    isActive: true,
                    puppies: [
                        {
                            id: 'p1',
                            name: 'Anton',
                            gender: 'R',
                            health: 'HD A',
                        },
                    ],
                })}
            />
        )
        expect(tabLabels()).toEqual([
            'Ahnentafel',
            '1. Woche',
            'Gesundheitsergebnisse',
        ])
        expect(document.getElementById('1. Woche')).toHaveTextContent('Geburt')
        expect(screen.getByRole('row', { name: /Anton/ })).toHaveTextContent(
            'AntonRHD A'
        )
    })
})
