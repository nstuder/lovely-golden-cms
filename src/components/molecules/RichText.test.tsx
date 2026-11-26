import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { media, paragraph } from '@/test/fixtures'
import { RichText, safeHref } from './RichText'

describe('RichText', () => {
    it('renders paragraphs and headings', () => {
        render(
            <RichText
                content={[
                    { type: 'h2', children: [{ text: 'Über uns' }] },
                    paragraph('Hallo Welt'),
                ]}
            />
        )
        expect(
            screen.getByRole('heading', { level: 2, name: 'Über uns' })
        ).toBeInTheDocument()
        expect(screen.getByText('Hallo Welt').tagName).toBe('P')
    })

    it('renders text marks', () => {
        const { container } = render(
            <RichText
                content={[
                    {
                        children: [
                            { text: 'fett', bold: true },
                            { text: 'kursiv', italic: true },
                            { text: 'code', code: true },
                            { text: 'unterstrichen', underline: true },
                        ],
                    },
                ]}
            />
        )
        expect(container.querySelector('p')?.innerHTML).toBe(
            '<strong>fett</strong><i>kursiv</i><code>code</code><u>unterstrichen</u>'
        )
    })

    it('renders lists, quotes and links', () => {
        render(
            <RichText
                content={[
                    {
                        type: 'ul',
                        children: [
                            { type: 'li', children: [{ text: 'Eins' }] },
                            { type: 'li', children: [{ text: 'Zwei' }] },
                        ],
                    },
                    { type: 'quote', children: [{ text: 'Zitat' }] },
                    {
                        children: [
                            {
                                type: 'link',
                                url: 'https://vdh.de',
                                children: [{ text: 'VDH' }],
                            },
                        ],
                    },
                ]}
            />
        )
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
        expect(screen.getByText('Zitat').tagName).toBe('BLOCKQUOTE')
        expect(screen.getByRole('link', { name: 'VDH' })).toHaveAttribute(
            'href',
            'https://vdh.de'
        )
    })

    it('renders uploads as responsive image', () => {
        render(
            <RichText
                content={[
                    {
                        type: 'upload',
                        value: media('upload'),
                        children: [{ text: '' }],
                    },
                ]}
            />
        )
        expect(screen.getAllByRole('img', { name: 'Alt upload' })).toHaveLength(
            1
        )
    })

    it('renders empty text nodes as empty paragraph without text', () => {
        const { container } = render(<RichText content={[paragraph('')]} />)
        expect(container.innerHTML).toBe('<p></p>')
    })

    it('ignores unknown node types and non-array content', () => {
        const { container } = render(
            <RichText content={[{ type: 'video', children: [] }]} />
        )
        expect(container).toBeEmptyDOMElement()
        const { container: empty } = render(<RichText content={null} />)
        expect(empty).toBeEmptyDOMElement()
    })
})

describe('safeHref', () => {
    it.each([
        '/kontakt',
        '#wurftagebuch',
        'https://www.vdh.de',
        'http://example.com',
        'mailto:info@example.com',
        'tel:+41 79 000 00 00',
    ])('keeps %s', (url) => expect(safeHref(url)).toBe(url))

    it.each([
        'javascript:alert(1)',
        ' JavaScript:alert(1)',
        'java\tscript:alert(1)',
        'data:text/html,x',
    ])('drops %j', (url) => expect(safeHref(url)).toBeUndefined())
})
