import type { ReactNode } from 'react'
import { TabLink } from '@/components/atoms'

export type Tab = {
    /** id of the pane, also used as URL hash */
    id: string
    label: string
    /** extra classes of the pane, e.g. `container` */
    className?: string
    content: ReactNode
}

/** Drops tabs that are switched off (`false`, `null`, `undefined`). */
export const compactTabs = (tabs: (Tab | false | null | undefined)[]): Tab[] =>
    tabs.filter((tab): tab is Tab => Boolean(tab))

type Props = {
    tabs: Tab[]
    /** classes of the tab list */
    navClassName: string
    navRole?: string
}

/** Bootstrap tabs in a colored bar, the first tab is active. */
export const Tabs = ({ tabs, navClassName, navRole }: Props) => (
    <>
        <div className="bg-primary mt-3">
            <ul className={navClassName} role={navRole}>
                {tabs.map((tab, i) => (
                    <TabLink
                        key={tab.id}
                        target={tab.id}
                        label={tab.label}
                        active={i === 0}
                    />
                ))}
            </ul>
        </div>
        <div className="tab-content">
            {tabs.map((tab, i) => (
                <div
                    key={tab.id}
                    className={['tab-pane', i === 0 && 'active', tab.className]
                        .filter(Boolean)
                        .join(' ')}
                    id={tab.id}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    </>
)
