'use client'
import { useEffect } from 'react'

/**
 * Loads Bootstrap's JS (data-API: carousel, collapse, dropdown, modal, tabs)
 * and keeps the active tab in the URL hash (formerly src/client/main.ts).
 */
export const BootstrapClient = () => {
    useEffect(() => {
        let cleanup: (() => void) | undefined
        const init = async () => {
            await Promise.all([
                import('bootstrap/js/dist/button'),
                import('bootstrap/js/dist/carousel'),
                import('bootstrap/js/dist/collapse'),
                import('bootstrap/js/dist/dropdown'),
                import('bootstrap/js/dist/modal'),
            ])
            const { default: Tab } = await import('bootstrap/js/dist/tab')

            const hash = decodeURI(new URL(location.href).hash)
            if (hash) {
                const currentTab = document.querySelector(
                    `[href="${hash.replace(/["\\]/g, '\\$&')}"]`
                )
                if (currentTab) Tab.getOrCreateInstance(currentTab).show()
            }

            const url = location.href.replace(/\/$/, '')
            const tabs = Array.from(
                document.querySelectorAll<HTMLAnchorElement>(
                    'a[data-bs-toggle="tab"]'
                )
            )
            const onClick = (event: Event) => {
                const href = (event.currentTarget as HTMLElement).getAttribute(
                    'href'
                )
                history.replaceState(null, '', url.split('#')[0] + href)
            }
            tabs.forEach((tab) => tab.addEventListener('click', onClick))
            cleanup = () =>
                tabs.forEach((tab) => tab.removeEventListener('click', onClick))
        }
        init()
        return () => cleanup?.()
    }, [])

    return null
}
