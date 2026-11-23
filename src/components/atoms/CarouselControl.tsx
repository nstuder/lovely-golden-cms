type Props = {
    /** id of the carousel element (without `#`) */
    target: string
    direction: 'prev' | 'next'
}

const LABELS = { prev: 'Vorheriges Bild', next: 'Nächstes Bild' }

/** Previous/next button of a Bootstrap carousel. */
export const CarouselControl = ({ target, direction }: Props) => (
    <a
        className={`carousel-control-${direction}`}
        href={`#${target}`}
        role="button"
        data-bs-slide={direction}
    >
        <span
            className={`carousel-control-${direction}-icon`}
            aria-hidden="true"
        ></span>
        <span className="visually-hidden">{LABELS[direction]}</span>
    </a>
)
