'use client'
import { useState, type KeyboardEvent } from 'react'
import { useLocationHash } from '@/components/behaviors/useLocationHash'
import type { Tab } from './tab'

const tabKey = (id: string) => `tab-${id}`

/**
 * Tabs in a colored bar, the first one is active. The active tab is kept in
 * the URL hash (shareable, e.g. /wuerfe/f-wurf#Wurftagebuch); arrow keys
 * switch between tabs.
 */
export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
    const hash = useLocationHash()
    const [chosen, setChosen] = useState<string>()
    const active =
        chosen ?? tabs.find((tab) => tab.id === hash)?.id ?? tabs[0]?.id

    const select = (id: string) => {
        setChosen(id)
        history.replaceState(null, '', `#${encodeURIComponent(id)}`)
    }

    const onKeyDown = (event: KeyboardEvent, i: number) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
        if (!step) return
        const next = tabs[(i + step + tabs.length) % tabs.length]
        select(next.id)
        document.getElementById(tabKey(next.id))?.focus()
    }

    return (
        <>
            <div className="mt-6 bg-plum/95">
                <div
                    role="tablist"
                    className="container-wide flex flex-wrap justify-center gap-1 py-2"
                >
                    {tabs.map((tab, i) => {
                        const selected = tab.id === active
                        return (
                            <button
                                key={tab.id}
                                id={tabKey(tab.id)}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                aria-controls={tab.id}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => select(tab.id)}
                                onKeyDown={(event) => onKeyDown(event, i)}
                                className={`rounded-full px-4 py-1.5 font-semibold transition-colors ${
                                    selected
                                        ? 'bg-blush text-plum-dark shadow'
                                        : 'text-white/90 hover:bg-white/15 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    id={tab.id}
                    role="tabpanel"
                    aria-labelledby={tabKey(tab.id)}
                    hidden={tab.id !== active}
                    className={tab.className}
                >
                    {tab.content}
                </div>
            ))}
        </>
    )
}
