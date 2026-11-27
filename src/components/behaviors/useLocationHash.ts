'use client'
import { useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
}

const read = () => {
    try {
        return decodeURIComponent(window.location.hash.slice(1))
    } catch {
        return window.location.hash.slice(1)
    }
}

/** Decoded URL hash without `#`; empty while rendering on the server. */
export const useLocationHash = () =>
    useSyncExternalStore(subscribe, read, () => '')
