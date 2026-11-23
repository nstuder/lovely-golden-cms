import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { paragraph } from '@/test/fixtures'
import { NewsTimeline } from './NewsTimeline'

describe('NewsTimeline', () => {
    it('renders one article per entry with title, date and content', () => {
        render(
            <NewsTimeline
                news={[
                    {
                        id: '1',
                        title: 'Welpen sind da',
                        publishedAt: '2024-05-01T08:00:00Z',
                        content: [
                            {
                                id: 'b',
                                blockType: 'richtext',
                                content: [paragraph('Alle gesund')],
                            },
                        ],
                    },
                    { id: '2', title: 'Zweiter Eintrag', publishedAt: null },
                ]}
            />
        )
        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(2)
        expect(articles[0]).toHaveTextContent('Welpen sind da')
        expect(articles[0]).toHaveTextContent('1.5.2024')
        expect(articles[0]).toHaveTextContent('Alle gesund')
        expect(articles[1]).toHaveTextContent('Zweiter Eintrag')
    })
})
