'use client'
import type { Configuration } from '@/cms/payload-types'
import { CarouselButton, CarouselDots, Image } from '@/components/atoms'
import { useCarousel } from '@/components/behaviors/useCarousel'

const INTERVAL = 6000

/** Full-width image slideshow below the navigation (cross-fade, autoplay). */
export const HeaderCarousel = ({
    images,
}: {
    images?: Configuration['images']
}) => {
    const slides = images ?? []
    const { index, go, next, prev, pause, resume } = useCarousel(
        slides.length,
        INTERVAL
    )

    return (
        <header
            className="relative overflow-hidden bg-plum-light"
            aria-roledescription="carousel"
            aria-label="Bilder"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
        >
            {/* all slides in one grid cell: the tallest one sets the height */}
            <div className="grid">
                {slides.map((item, i) => (
                    <div
                        key={item.id ?? i}
                        className={`col-start-1 row-start-1 transition-opacity duration-1000 ${
                            i === index ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden={i !== index}
                    >
                        <Image
                            image={item.image}
                            className="block w-full"
                            // largest visible image (LCP), the other slides can wait
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>
            {slides.length > 1 && (
                <>
                    <CarouselButton
                        direction="prev"
                        onClick={prev}
                        className="absolute top-1/2 left-3 hidden -translate-y-1/2 sm:grid"
                    />
                    <CarouselButton
                        direction="next"
                        onClick={next}
                        className="absolute top-1/2 right-3 hidden -translate-y-1/2 sm:grid"
                    />
                    <CarouselDots
                        count={slides.length}
                        active={index}
                        onSelect={go}
                        className="absolute inset-x-0 bottom-3 hidden sm:flex"
                    />
                </>
            )}
        </header>
    )
}
