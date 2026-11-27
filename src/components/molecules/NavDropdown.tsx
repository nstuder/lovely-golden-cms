'use client'
import { useEffect, useId, useRef, useState } from 'react'
import type { Navigation } from '@/cms/payload-types'
import { linkHref } from '@/lib/links'
import { NAV_LINK_CLASS } from './NavLink'

type SubItem = NonNullable<
    NonNullable<NonNullable<Navigation['items']>[number]['subMenu']>['items']
>[number]

type Props = { label: string; items?: SubItem[] | null }

/**
 * Navigation entry with a submenu: a floating panel on large screens, an
 * indented list in the mobile menu. Closes on Escape and outside clicks.
 */
export const NavDropdown = ({ label, items }: Props) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLLIElement>(null)
    const menuId = useId()

    useEffect(() => {
        if (!open) return
        const onClick = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) setOpen(false)
        }
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('click', onClick)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('click', onClick)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    return (
        <li className="relative" ref={ref}>
            <button
                type="button"
                className={`${NAV_LINK_CLASS} flex w-full items-center gap-1`}
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen(!open)}
            >
                {label}
                <svg
                    viewBox="0 0 20 20"
                    className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                </svg>
            </button>
            <ul
                id={menuId}
                hidden={!open}
                className="pl-4 lg:absolute lg:top-full lg:left-0 lg:z-50 lg:mt-2 lg:min-w-52 lg:overflow-hidden lg:rounded-lg lg:bg-white lg:py-1 lg:pl-0 lg:shadow-xl"
            >
                {items?.map((item, i) => (
                    <li key={item.id ?? i}>
                        <a
                            className="block rounded-md px-3 py-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:rounded-none lg:px-4 lg:text-ink lg:hover:bg-plum lg:hover:text-white"
                            href={linkHref(
                                item.linkType,
                                item.slugExtern,
                                item.slugIntern
                            )}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    )
}
