type Props = {
    direction: 'prev' | 'next'
    onClick: () => void
    /** e.g. position of the button */
    className?: string
}

const LABELS = { prev: 'Vorheriges Bild', next: 'Nächstes Bild' }

/** Round previous/next button with a chevron (header carousel, lightbox). */
export const CarouselButton = ({ direction, onClick, className }: Props) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={LABELS[direction]}
        className={[
            'grid size-11 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-white',
            className,
        ]
            .filter(Boolean)
            .join(' ')}
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
            <path
                d={direction === 'prev' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'}
            />
        </svg>
    </button>
)
