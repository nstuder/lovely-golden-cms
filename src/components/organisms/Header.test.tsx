import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Configuration, Navigation } from '@/cms/payload-types'
import { media } from '@/test/fixtures'
import { Header } from './Header'

describe('Header', () => {
    it('renders navigation and the image carousel', () => {
        const { container } = render(
            <Header
                navigation={{ id: 'nav', items: [] } as Navigation}
                configuration={
                    {
                        id: 'config',
                        images: [
                            { id: '1', image: media('one') },
                            { id: '2', image: media('two') },
                        ],
                    } as Configuration
                }
            />
        )
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('banner')).toHaveAttribute(
            'aria-roledescription',
            'carousel'
        )
        expect(container.querySelectorAll('header img')).toHaveLength(2)
        expect(
            screen.getByRole('button', { name: 'Nächstes Bild' })
        ).toBeInTheDocument()
    })
})
