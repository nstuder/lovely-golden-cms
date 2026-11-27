import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Configuration } from '@/cms/payload-types'
import { media } from '@/test/fixtures'
import { Footer, stripCopyright } from './Footer'

describe('Footer', () => {
    it('shows club logos, copyright of the current year and privacy link', () => {
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
            `© ${new Date().getFullYear()} Moments of Love · Datenschutz`
        )
        expect(
            screen.getByRole('link', { name: 'Datenschutz' })
        ).toHaveAttribute('href', '/datenschutz')
    })

    it('drops a hard-coded year and "Copyright" from the footnote', () => {
        expect(stripCopyright('2024 Copyright: Moments of Love')).toBe(
            'Moments of Love'
        )
        expect(stripCopyright('© 2019-2024 Moments of Love')).toBe(
            'Moments of Love'
        )
        expect(stripCopyright('Copyright (c) 2024, Moments of Love')).toBe(
            'Moments of Love'
        )
        expect(stripCopyright('Moments of Love 2024')).toBe(
            'Moments of Love 2024'
        )
        expect(stripCopyright(null)).toBe('')
    })
})
