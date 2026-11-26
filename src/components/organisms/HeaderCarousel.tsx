import type { Configuration } from '@/cms/payload-types'
import { CarouselControl, CarouselIndicators, Image } from '@/components/atoms'

const ID = 'carouselDogs'

/** Full-width image carousel below the navigation. */
export const HeaderCarousel = ({
    images,
}: {
    images?: Configuration['images']
}) => (
    <header className="head">
        <div id={ID} className="carousel slide" data-bs-ride="carousel">
            <CarouselIndicators
                target={ID}
                keys={(images ?? []).map((item, i) => item.id ?? String(i))}
                className="d-none d-sm-flex"
            />
            <div className="carousel-inner">
                {images?.map((item, i) => (
                    <div
                        key={item.id ?? i}
                        className={`carousel-item ${i === 0 ? 'active' : ''}`}
                    >
                        <Image
                            image={item.image}
                            className="w-100"
                            // largest visible image (LCP), the other slides can wait
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>
            <CarouselControl target={ID} direction="prev" />
            <CarouselControl target={ID} direction="next" />
        </div>
    </header>
)
