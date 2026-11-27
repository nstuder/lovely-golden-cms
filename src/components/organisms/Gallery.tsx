'use client'
import { useEffect, useRef, useState, type TouchEvent } from 'react'
import type { Media } from '@/cms/payload-types'
import { CarouselButton, Image } from '@/components/atoms'
import { useCarousel } from '@/components/behaviors/useCarousel'

type Item = { image?: Media | string | null; id?: string | null }

/** Thumbnails fade in once loaded (also those loaded before hydration). */
const revealOnLoad = (grid: HTMLDivElement | null) => {
    if (!grid) return
    const reveal = (img: HTMLImageElement) => {
        img.dataset.loaded = ''
    }
    grid.querySelectorAll('img').forEach((img) => img.complete && reveal(img))
    const onLoad = (event: Event) => {
        if (event.target instanceof HTMLImageElement) reveal(event.target)
    }
    grid.addEventListener('load', onLoad, true)
    grid.addEventListener('error', onLoad, true)
    return () => {
        grid.removeEventListener('load', onLoad, true)
        grid.removeEventListener('error', onLoad, true)
    }
}

const THUMB_SIZES =
    '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

/**
 * Image grid; a click opens the image in a fullscreen lightbox (native
 * <dialog>: Escape closes it, focus stays inside) with arrow keys and swipe.
 */
export const Gallery = ({ images }: { images?: Item[] | null }) => {
    const items = images ?? []
    const dialog = useRef<HTMLDialogElement>(null)
    const [open, setOpen] = useState(false)
    const { index, go, next, prev } = useCarousel(items.length)
    const touchStart = useRef<number | null>(null)

    const show = (i: number) => {
        go(i)
        setOpen(true)
        dialog.current?.showModal()
    }
    const close = () => dialog.current?.close()

    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') next()
            if (event.key === 'ArrowLeft') prev()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, next, prev])

    const onTouchStart = (event: TouchEvent) => {
        touchStart.current = event.touches[0]?.clientX ?? null
    }
    const onTouchEnd = (event: TouchEvent) => {
        const start = touchStart.current
        const end = event.changedTouches[0]?.clientX
        if (start === null || end === undefined) return
        if (Math.abs(end - start) > 50) {
            if (end < start) next()
            else prev()
        }
    }

    const current = items[index]

    return (
        <>
            <div
                ref={revealOnLoad}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {items.map((item, i) => (
                    <button
                        key={item.id ?? i}
                        type="button"
                        className="group overflow-hidden rounded-lg bg-plum-light shadow-md transition-shadow hover:shadow-xl"
                        onClick={() => show(i)}
                        aria-label={`Bild ${i + 1} vergrößern`}
                    >
                        <Image
                            image={item.image}
                            sizes={THUMB_SIZES}
                            // mobile: whole picture, one per row; larger screens: uniform 4:3 tiles
                            className="block w-full object-cover sm:aspect-[4/3] opacity-0 transition duration-500 group-hover:scale-105 data-loaded:opacity-100"
                        />
                    </button>
                ))}
            </div>

            <dialog
                ref={dialog}
                className="m-0 h-dvh max-h-none w-dvw max-w-none bg-black/90 p-0 backdrop:bg-black/60"
                onClose={() => setOpen(false)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) close()
                }}
                aria-label="Galerie"
            >
                {open && current && (
                    <div
                        className="relative grid h-full place-items-center p-4 sm:p-12"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <Image
                            key={current.id ?? index}
                            image={current.image}
                            priority
                            className="max-h-[85dvh] w-auto rounded-md object-contain"
                        />
                        <p className="absolute bottom-3 text-sm text-white/80">
                            {index + 1} / {items.length}
                        </p>
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Schließen"
                            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
                        >
                            ×
                        </button>
                        {items.length > 1 && (
                            <>
                                <CarouselButton
                                    direction="prev"
                                    onClick={prev}
                                    className="absolute top-1/2 left-3 -translate-y-1/2"
                                />
                                <CarouselButton
                                    direction="next"
                                    onClick={next}
                                    className="absolute top-1/2 right-3 -translate-y-1/2"
                                />
                            </>
                        )}
                    </div>
                )}
            </dialog>
        </>
    )
}
