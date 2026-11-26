import type { CollectionSlug, TextField, Where } from 'payload'
import { text } from 'payload/shared'

/** `/segment/segment`: lowercase letters, digits and dashes, no trailing slash. */
const SLUG_PATTERN = /^(\/[a-z0-9äöüß-]+)+$/

/**
 * What editors type often isn't a valid path yet: `Summer ` -> `/hunde/summer`.
 * Values that already are a path (start with /) only get trimmed and lowercased.
 */
export const normalizeSlug = (value: unknown, prefix = '/') => {
    if (typeof value !== 'string') return value
    const slug = value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\/{2,}/g, '/')
        .replace(/(.)\/$/, '$1')
    if (!slug) return slug
    return slug.startsWith('/') ? slug : `${prefix}${slug}`
}

/** Error message (German, like the editors' admin) or `true`. */
export const checkSlugFormat = (slug: string, prefix = '/') => {
    if (!SLUG_PATTERN.test(slug)) {
        return 'Nur Kleinbuchstaben, Zahlen und Bindestriche, getrennt durch "/" (z. B. /hunde/summer).'
    }
    if (prefix !== '/' && !slug.startsWith(prefix)) {
        return `Muss mit "${prefix}" beginnen, sonst ist die Seite unter dieser Adresse nicht erreichbar.`
    }
    return true
}

type Options = {
    /** path of the website route, e.g. `/hunde/` for /hunde/[slug] */
    prefix?: string
    localized?: boolean
}

/**
 * URL path of a document. Normalized before validation, checked for the
 * format the website routes expect and unique within the collection.
 */
export const slugField = ({
    prefix = '/',
    localized = false,
}: Options = {}): TextField => ({
    name: 'slug',
    type: 'text',
    label: {
        de: 'Slug (Pfad in der URL)',
        en: 'Slug (Path in URL)',
    },
    required: true,
    localized,
    index: true,
    admin: {
        description: `z. B. ${prefix === '/' ? '/kontakt' : `${prefix}name`}`,
    },
    hooks: {
        beforeValidate: [({ value }) => normalizeSlug(value, prefix)],
    },
    validate: async (value, options) => {
        const required = await text(value, options)
        if (required !== true || !value) return required

        const format = checkSlugFormat(value, prefix)
        if (format !== true) return format

        // the database query only on save, not on every keystroke
        const { collectionSlug, event, id, req } = options
        if (event === 'onChange' || !collectionSlug) return true
        const where: Where = { slug: { equals: value } }
        if (id !== undefined) where.id = { not_equals: id }
        const { totalDocs } = await req.payload.count({
            collection: collectionSlug as CollectionSlug,
            where,
            locale:
                req.locale === 'all' ? undefined : (req.locale ?? undefined),
            req,
        })
        return totalDocs === 0
            ? true
            : `"${value}" wird schon von einem anderen Eintrag verwendet.`
    },
})
