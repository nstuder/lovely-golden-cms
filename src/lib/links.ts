/** Relationship value of an internal link (populated document or just its id). */
export type InternalLink = { value?: unknown } | null | undefined

/** Slug of a populated internal link, `undefined` if it isn't populated. */
export const internalSlug = (link: InternalLink): string | undefined =>
    link?.value &&
    typeof link.value === 'object' &&
    'slug' in link.value &&
    typeof link.value.slug === 'string'
        ? link.value.slug
        : undefined

/** Target of a navigation entry, depending on its `linkType`. */
export const linkHref = (
    linkType: 'internal' | 'external' | null | undefined,
    external: string | null | undefined,
    internal: InternalLink
): string | undefined => {
    if (linkType === 'external') return external ?? undefined
    if (linkType === 'internal') return internalSlug(internal)
    return undefined
}
