'use client'
import { useEffect, useState } from 'react'

/** Shown after scrolling down this far (px). */
const THRESHOLD = 800

/** Round button at the bottom right that scrolls back to the top on long pages. */
export const BackToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const update = () => setVisible(window.scrollY > THRESHOLD)
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <button
            type="button"
            aria-label="Nach oben"
            onClick={() => window.scrollTo({ top: 0 })}
            className={`fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full bg-plum text-white shadow-lg transition duration-300 hover:bg-plum-dark sm:right-6 sm:bottom-6 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
        >
            <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    )
}
