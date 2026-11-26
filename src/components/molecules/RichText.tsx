import { Fragment, type ReactNode } from 'react'
import type { Media } from '@/cms/payload-types'
import { ResponsiveImage } from '@/components/atoms'

type SlateNode = {
    text?: string
    bold?: boolean
    italic?: boolean
    code?: boolean
    underline?: boolean
    type?: string
    url?: string
    value?: Media | string
    children?: SlateNode[]
}

/**
 * Only relative, web, mail and phone links: no `javascript:` from pasted
 * content. Browsers ignore tabs/newlines in URLs, so the check does too.
 */
export const safeHref = (url?: string) => {
    if (!url) return undefined
    // eslint-disable-next-line no-control-regex
    const compact = url.replace(/[\u0000-\u0020]/g, '')
    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(compact)
    if (!scheme) return url
    return ['http', 'https', 'mailto', 'tel'].includes(scheme[1].toLowerCase())
        ? url
        : undefined
}

const renderLeaf = (node: SlateNode): ReactNode => {
    if (node.bold) return <strong>{node.text}</strong>
    if (node.italic) return <i>{node.text}</i>
    if (node.code) return <code>{node.text}</code>
    if (node.underline) return <u>{node.text}</u>
    return node.text
}

const renderNodes = (nodes?: SlateNode[]): ReactNode =>
    nodes?.map((node, i) => <Fragment key={i}>{renderNode(node)}</Fragment>)

const renderNode = (node: SlateNode): ReactNode => {
    if (typeof node.text === 'string') {
        return node.text ? renderLeaf(node) : null
    }
    const children = renderNodes(node.children)
    switch (node.type) {
        case 'h1':
            return <h1>{children}</h1>
        case 'h2':
            return <h2>{children}</h2>
        case 'h3':
            return <h3>{children}</h3>
        case 'h4':
            return <h4>{children}</h4>
        case 'h5':
            return <h5>{children}</h5>
        case 'h6':
            return <h6>{children}</h6>
        case 'quote':
            return <blockquote>{children}</blockquote>
        case 'ul':
            return <ul>{children}</ul>
        case 'ol':
            return <ol>{children}</ol>
        case 'li':
            return <li>{children}</li>
        case 'indent':
            return <p>{children}</p>
        case 'link':
            return <a href={safeHref(node.url)}>{children}</a>
        case 'upload':
            return <ResponsiveImage image={node.value} />
        case undefined:
            return <p>{children}</p>
        default:
            return null
    }
}

/** Renders Slate rich text (ritchText.hbs). */
export const RichText = ({ content }: { content?: unknown }) =>
    Array.isArray(content) ? <>{renderNodes(content as SlateNode[])}</> : null
