import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { GalleriesOverviewTemplate } from './GalleriesOverviewTemplate'

describe('GalleriesOverviewTemplate', () => {
    it('uses the first image of each gallery as cover', () => {
        render(
            <GalleriesOverviewTemplate
                galleries={[
                    {
                        id: '1',
                        name: 'Welpen',
                        gallery: [
                            { id: 'a', image: media('first') },
                            { id: 'b', image: media('second') },
                        ],
                    },
                    { id: '2', name: 'Leer', gallery: [] },
                ]}
            />
        )
        expect(screen.getAllByRole('img')).toHaveLength(1)
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Alt first')
        expect(screen.getByRole('link', { name: /Welpen/ })).toHaveAttribute(
            'href',
            '/galerie/Welpen'
        )
    })
})
