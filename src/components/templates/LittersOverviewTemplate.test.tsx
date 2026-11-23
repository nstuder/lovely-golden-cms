import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { litter } from '@/test/fixtures'
import { LittersOverviewTemplate } from './LittersOverviewTemplate'

describe('LittersOverviewTemplate', () => {
    it('links all litters', () => {
        render(
            <LittersOverviewTemplate
                litters={[
                    litter(),
                    litter({ id: '2', name: 'B-Wurf', slug: '/wuerfe/b-wurf' }),
                ]}
            />
        )
        expect(screen.getByRole('link', { name: 'B-Wurf' })).toHaveAttribute(
            'href',
            '/wuerfe/b-wurf'
        )
        expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2)
    })
})
