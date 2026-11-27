import type { ReactNode } from 'react'

/*
 * Not in Tabs.tsx: that is a client module, server components only get a
 * reference for functions imported from there and could not call compactTabs.
 */

export type Tab = {
    /** id of the panel, also used as URL hash */
    id: string
    label: string
    /** extra classes of the panel, e.g. its width */
    className?: string
    content: ReactNode
}

/** Drops tabs that are switched off (`false`, `null`, `undefined`). */
export const compactTabs = (tabs: (Tab | false | null | undefined)[]): Tab[] =>
    tabs.filter((tab): tab is Tab => Boolean(tab))
