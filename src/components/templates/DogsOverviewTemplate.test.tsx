import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { dog } from '@/test/fixtures'
import { DogsOverviewTemplate } from './DogsOverviewTemplate'

describe('DogsOverviewTemplate', () => {
    it('groups dogs by category in a fixed order and hides empty ones', () => {
        render(
            <DogsOverviewTemplate
                dogs={[
                    dog({ id: '1', name: 'Oldie', type: 'dead' }),
                    dog({ id: '2', name: 'Summer', type: 'fzucht' }),
                    dog({ id: '3', name: 'Max', type: 'rzucht' }),
                    dog({ id: '4', name: 'Lilly', type: 'fzucht' }),
                ]}
            />
        )
        expect(
            screen
                .getAllByRole('heading', { level: 2 })
                .map((h) => h.textContent)
        ).toEqual(['Zuchtrüden', 'Zuchthündinnen', 'In Memoriam'])
        expect(
            screen
                .getAllByRole('heading', { level: 3 })
                .map((h) => h.textContent)
        ).toEqual(['Max', 'Summer', 'Lilly', 'Oldie'])
    })

    it('links each dog to its page', () => {
        render(<DogsOverviewTemplate dogs={[dog()]} />)
        expect(screen.getByRole('link', { name: 'Summer' })).toHaveAttribute(
            'href',
            '/hunde/summer'
        )
    })
})
