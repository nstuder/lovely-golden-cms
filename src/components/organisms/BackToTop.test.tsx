import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BackToTop } from './BackToTop'

const scrollTo = (y: number) =>
    act(() => {
        Object.defineProperty(window, 'scrollY', {
            value: y,
            configurable: true,
        })
        fireEvent.scroll(window)
    })

describe('BackToTop', () => {
    afterEach(() => scrollTo(0))

    it('appears only further down the page', () => {
        render(<BackToTop />)
        expect(screen.queryByRole('button', { name: 'Nach oben' })).toBeNull()
        scrollTo(1500)
        expect(screen.getByRole('button', { name: 'Nach oben' })).toBeVisible()
        scrollTo(100)
        expect(screen.queryByRole('button', { name: 'Nach oben' })).toBeNull()
    })

    it('scrolls back to the top', () => {
        window.scrollTo = vi.fn()
        render(<BackToTop />)
        scrollTo(1500)
        fireEvent.click(screen.getByRole('button', { name: 'Nach oben' }))
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
    })
})
