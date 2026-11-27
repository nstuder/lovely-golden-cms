'use client'
import { useCallback, useEffect, useState } from 'react'

/**
 * Index of the visible slide with wrap-around. With `interval` the slides
 * advance on their own, paused while hovered/focused and switched off for
 * people who prefer reduced motion.
 */
export const useCarousel = (count: number, interval?: number) => {
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const go = useCallback(
        (to: number) => setIndex(count ? (to + count) % count : 0),
        [count]
    )
    const next = useCallback(
        () => setIndex((i) => (i + 1) % (count || 1)),
        [count]
    )
    const prev = useCallback(
        () => setIndex((i) => (i - 1 + (count || 1)) % (count || 1)),
        [count]
    )

    useEffect(() => {
        if (!interval || paused || count < 2) return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
            return
        const timer = window.setInterval(next, interval)
        return () => window.clearInterval(timer)
    }, [interval, paused, count, next])

    return {
        index,
        go,
        next,
        prev,
        pause: () => setPaused(true),
        resume: () => setPaused(false),
    }
}
