import type { Media } from '@/cms/payload-types'
import { CarouselControl, CarouselIndicators, Image } from '@/components/atoms'

type Item = { image?: Media | string | null; id?: string | null }

const MODAL_ID = 'modal_gallery'
const CAROUSEL_ID = 'carousel_gallery'

const GalleryItem = ({ item, index }: { item: Item; index: number }) => (
    <>
        <figure className="col-lg-4 col-xl-3 d-lg-block d-none">
            <a data-bs-toggle="modal" data-bs-target={`#${MODAL_ID}`} href="#">
                <div
                    data-bs-target={`#${CAROUSEL_ID}`}
                    data-bs-slide-to={index}
                >
                    <Image
                        image={item.image}
                        className="shadow image-hover mx-auto d-block"
                    />
                </div>
            </a>
        </figure>
        <div className="d-lg-none d-block col-sm-6">
            <Image image={item.image} className="shadow mx-auto d-block" />
        </div>
    </>
)

/** Image grid with fullscreen carousel modal (organisms/gallery.hbs). */
export const Gallery = ({ images }: { images?: Item[] | null }) => (
    <>
        <div className="row g-2 justify-content-evenly align-items-center">
            {images?.map((item, i) => (
                <GalleryItem key={item.id ?? i} item={item} index={i} />
            ))}
        </div>

        <div
            className="modal fade"
            id={MODAL_ID}
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content bg-transparent">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div
                        id={CAROUSEL_ID}
                        className="carousel slide mh-100"
                        data-bs-ride="carousel"
                    >
                        <CarouselIndicators
                            target={CAROUSEL_ID}
                            keys={(images ?? []).map(
                                (item, i) => item.id ?? String(i)
                            )}
                        />
                        <div className="carousel-inner">
                            {images?.map((item, i) => (
                                <div
                                    key={item.id ?? i}
                                    className={`carousel-item carousel-item-modal ${
                                        i === 0 ? 'active' : ''
                                    }`}
                                >
                                    <Image
                                        image={item.image}
                                        className="mx-auto"
                                    />
                                </div>
                            ))}
                        </div>
                        <CarouselControl
                            target={CAROUSEL_ID}
                            direction="prev"
                        />
                        <CarouselControl
                            target={CAROUSEL_ID}
                            direction="next"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
)
