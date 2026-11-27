'use client'
import { useId, useState } from 'react'
import type { Navigation as NavigationType } from '@/cms/payload-types'
import { Brand } from '@/components/atoms'
import { NavDropdown, NavLink } from '@/components/molecules'
import { linkHref } from '@/lib/links'

type Item = NonNullable<NavigationType['items']>[number]

/** Sticky navigation bar, collapsed into a menu button below `lg`. */
export const Navigation = ({ items }: { items?: Item[] | null }) => {
    const [open, setOpen] = useState(false)
    const menuId = useId()

    return (
        <nav className="sticky top-0 z-40 bg-plum/95 shadow-md backdrop-blur">
            <a
                className="sr-only text-white focus:not-sr-only focus:block focus:px-4 focus:py-2"
                href="#inhalt"
            >
                Navigation überspringen
            </a>
            <div className="container-wide flex flex-wrap items-center justify-between gap-x-6 py-2">
                <Brand />
                <button
                    type="button"
                    className="grid size-11 place-items-center rounded-md text-white hover:bg-white/10 lg:hidden"
                    aria-controls={menuId}
                    aria-expanded={open}
                    aria-label="Menü"
                    onClick={() => setOpen(!open)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path
                            d={
                                open
                                    ? 'M6 6l12 12M18 6 6 18'
                                    : 'M4 7h16M4 12h16M4 17h16'
                            }
                        />
                    </svg>
                </button>
                <ul
                    id={menuId}
                    className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 pb-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:pb-0`}
                >
                    {items?.map((item, i) => {
                        const key = item.id ?? i
                        if (item.type === 'link') {
                            return (
                                <NavLink
                                    key={key}
                                    label={item.label}
                                    href={linkHref(
                                        item.linkType,
                                        item.pageExtern,
                                        item.pageIntern
                                    )}
                                />
                            )
                        }
                        if (item.type === 'subMenu') {
                            return (
                                <NavDropdown
                                    key={key}
                                    label={item.label}
                                    items={item.subMenu?.items}
                                />
                            )
                        }
                        return null
                    })}
                </ul>
            </div>
        </nav>
    )
}
