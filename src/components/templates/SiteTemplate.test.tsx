import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Configuration, Navigation } from '@/cms/payload-types'
import { SiteTemplate } from './SiteTemplate'

describe('SiteTemplate', () => {
    it('wraps the content with header and footer', () => {
        render(
            <SiteTemplate
                navigation={{ id: 'n', items: [] } as Navigation}
                configuration={
                    { id: 'c', footnote: 'Fußnote' } as Configuration
                }
            >
                <p>Seiteninhalt</p>
            </SiteTemplate>
        )
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('main')).toHaveAttribute('id', 'inhalt')
        expect(screen.getByRole('main')).toHaveTextContent('Seiteninhalt')
        expect(screen.getByRole('contentinfo')).toHaveTextContent('Fußnote')
    })
})
