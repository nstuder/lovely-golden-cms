type Props = {
    /** id of the carousel element (without `#`) */
    target: string
    /** one key per slide */
    keys: string[]
    className?: string
}

/** Slide indicators of a Bootstrap carousel, the first one is active. */
export const CarouselIndicators = ({ target, keys, className }: Props) => (
    <ol
        className={['carousel-indicators', className].filter(Boolean).join(' ')}
    >
        {keys.map((key, i) => (
            <li
                key={key}
                data-bs-target={`#${target}`}
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
            ></li>
        ))}
    </ol>
)
