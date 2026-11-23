import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { paragraph } from '@/test/fixtures'
import { ContentPageTemplate } from './ContentPageTemplate'

describe('ContentPageTemplate', () => {
    it('shows title and content blocks', () => {
        render(
            <ContentPageTemplate
                title="Kontakt"
                content={[
                    {
                        id: '1',
                        blockType: 'richtext',
                        content: [paragraph('Ruft an')],
                    },
                ]}
            />
        )
        expect(
            screen.getByRole('heading', { level: 1, name: 'Kontakt' })
        ).toBeInTheDocument()
        expect(screen.getByText('Ruft an')).toBeInTheDocument()
    })
})
