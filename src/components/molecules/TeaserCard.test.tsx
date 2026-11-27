import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { TeaserCard } from './TeaserCard'

describe('TeaserCard', () => {
    it('links image and title', () => {
        render(
            <TeaserCard
                href="/hunde/summer"
                title="Summer"
                image={media('summer')}
            />
        )
        const link = screen.getByRole('link', { name: 'Summer' })
        expect(link).toHaveAttribute('href', '/hunde/summer')
        expect(
            screen.getByRole('heading', { level: 3, name: 'Summer' })
        ).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveClass(
            'w-full',
            'group-hover:scale-105'
        )
    })
})
