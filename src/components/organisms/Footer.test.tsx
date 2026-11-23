import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Configuration } from '@/cms/payload-types'
import { media } from '@/test/fixtures'
import { Footer } from './Footer'

describe('Footer', () => {
    it('shows club logos, footnote and privacy link', () => {
        render(
            <Footer
                configuration={
                    {
                        id: 'config',
                        footnote: '© Moments of Love',
                        clubs: [
                            {
                                id: '1',
                                name: 'VDH',
                                link: 'https://vdh.de',
                                image: media('vdh'),
                            },
                        ],
                    } as Configuration
                }
            />
        )
        expect(screen.getByRole('link', { name: 'VDH' })).toHaveAttribute(
            'href',
            'https://vdh.de'
        )
        expect(screen.getByRole('contentinfo')).toHaveTextContent(
            '© Moments of Love Datenschutz'
        )
        expect(
            screen.getByRole('link', { name: 'Datenschutz' })
        ).toHaveAttribute('href', '/datenschutz')
    })
})
