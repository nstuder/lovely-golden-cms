type Props = {
    count: number
    active: number
    onSelect: (index: number) => void
    className?: string
}

/** One dot per slide, the active one is wider. */
export const CarouselDots = ({ count, active, onSelect, className }: Props) => (
    <div
        className={['flex justify-center gap-2', className]
            .filter(Boolean)
            .join(' ')}
    >
        {Array.from({ length: count }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Bild ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full bg-white shadow transition-all ${
                    i === active ? 'w-6' : 'w-2 opacity-60 hover:opacity-90'
                }`}
            />
        ))}
    </div>
)
