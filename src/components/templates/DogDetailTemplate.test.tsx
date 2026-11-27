import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { dog, paragraph } from '@/test/fixtures'
import { DogDetailTemplate } from './DogDetailTemplate'

const tabLabels = () => screen.getAllByRole('tab').map((tab) => tab.textContent)

describe('DogDetailTemplate', () => {
    it('shows name, breeding name and description', () => {
        render(<DogDetailTemplate dog={dog()} />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'Summer' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Summer of Love' })
        ).toBeInTheDocument()
        expect(screen.getByText('Beschreibung von Summer')).toBeInTheDocument()
    })

    it('always has gallery and pedigree tabs', () => {
        render(<DogDetailTemplate dog={dog()} />)
        expect(tabLabels()).toEqual(['Galerie', 'Ahnentafel'])
        expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'Galerie')
    })

    it('adds the optional tabs when they are active', () => {
        render(
            <DogDetailTemplate
                dog={dog({
                    isShowsActive: true,
                    isExamsActive: true,
                    isBreedActive: true,
                    shows: [
                        {
                            id: 's1',
                            location: 'Dortmund',
                            date: '2024-04-20T10:00:00Z',
                            class: 'Offene Klasse',
                            result: 'V1',
                        },
                    ],
                    textExams: [paragraph('Wesenstest bestanden')],
                    content: [
                        {
                            id: 'c1',
                            blockType: 'richtext',
                            content: [paragraph('Unsere Nachzucht')],
                        },
                    ],
                })}
            />
        )
        expect(tabLabels()).toEqual([
            'Galerie',
            'Ahnentafel',
            'Ausstellungsergebnisse',
            'Prüfungen',
            'Nachzucht',
        ])
        fireEvent.click(
            screen.getByRole('tab', { name: 'Ausstellungsergebnisse' })
        )
        expect(screen.getByRole('row', { name: /Dortmund/ })).toHaveTextContent(
            'Dortmund20.4.2024Offene KlasseV1'
        )
        expect(screen.getByText('Wesenstest bestanden')).toBeInTheDocument()
        expect(screen.getByText('Unsere Nachzucht')).toBeInTheDocument()
    })
})
