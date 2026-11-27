import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { media } from '@/test/fixtures'
import { Gallery } from './Gallery'

beforeAll(() => {
    // jsdom has no modal dialogs
    HTMLDialogElement.prototype.showModal ??= function (
        this: HTMLDialogElement
    ) {
        this.open = true
    }
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
        this.open = false
        this.dispatchEvent(new Event('close'))
    }
})

describe('Gallery', () => {
    const images = ['a', 'b', 'c'].map((name) => ({
        id: name,
        image: media(name),
    }))

    it('renders one uniform thumbnail button per image', () => {
        render(<Gallery images={images} />)
        const buttons = screen.getAllByRole('button', { name: /vergrößern/ })
        expect(buttons).toHaveLength(3)
        const thumb = screen.getByRole('img', { name: 'Alt a' })
        expect(thumb).toHaveClass('aspect-[4/3]', 'object-cover')
        expect(thumb).toHaveAttribute(
            'sizes',
            '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw'
        )
    })

    it('opens the clicked image in the lightbox and browses with buttons and arrow keys', () => {
        render(<Gallery images={images} />)
        fireEvent.click(
            screen.getByRole('button', { name: 'Bild 2 vergrößern' })
        )
        const dialog = screen.getByRole('dialog', { hidden: true })
        expect(dialog).toHaveAttribute('open')
        expect(dialog).toHaveTextContent('2 / 3')

        fireEvent.click(screen.getByRole('button', { name: 'Nächstes Bild' }))
        expect(dialog).toHaveTextContent('3 / 3')
        fireEvent.keyDown(document, { key: 'ArrowRight' })
        expect(dialog).toHaveTextContent('1 / 3')
        fireEvent.keyDown(document, { key: 'ArrowLeft' })
        expect(dialog).toHaveTextContent('3 / 3')

        fireEvent.click(screen.getByRole('button', { name: 'Schließen' }))
        expect(dialog).not.toHaveAttribute('open')
        expect(dialog).not.toHaveTextContent('/ 3')
    })

    it('browses with swipe gestures', () => {
        render(<Gallery images={images} />)
        fireEvent.click(
            screen.getByRole('button', { name: 'Bild 1 vergrößern' })
        )
        const dialog = screen.getByRole('dialog', { hidden: true })
        const stage = dialog.firstElementChild!
        fireEvent.touchStart(stage, { touches: [{ clientX: 300 }] })
        fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100 }] })
        expect(dialog).toHaveTextContent('2 / 3')
    })

    it('loads only the thumbnails, not the large images', () => {
        render(<Gallery images={images} />)
        expect(screen.getAllByRole('img')).toHaveLength(3)
    })

    it('renders nothing visible without images', () => {
        const { container } = render(<Gallery images={null} />)
        expect(container.querySelectorAll('img')).toHaveLength(0)
    })
})
