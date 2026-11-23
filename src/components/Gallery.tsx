import type { Media } from '@/cms/payload-types'
import { Image } from './Image'

type Item = { image?: Media | string | null; id?: string | null }

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
            id="modal_gallery"
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
                        id="carousel_gallery"
                        className="carousel slide mh-100"
                        data-bs-ride="carousel"
                    >
                        <ol className="carousel-indicators">
                            {images?.map((item, i) => (
                                <li
                                    key={item.id ?? i}
                                    data-bs-target="#carousel_gallery"
                                    data-bs-slide-to={i}
                                    className={i === 0 ? 'active' : ''}
                                ></li>
                            ))}
                        </ol>
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
                        <a
                            className="carousel-control-prev"
                            href="#carousel_gallery"
                            role="button"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">
                                Vorheriges Bild
                            </span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carousel_gallery"
                            role="button"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">
                                Nächstes Bild
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
)

const GalleryItem = ({ item, index }: { item: Item; index: number }) => (
    <>
        <figure className="col-lg-4 col-xl-3 d-lg-block d-none">
            <a data-bs-toggle="modal" data-bs-target="#modal_gallery" href="#">
                <div
                    data-bs-target="#carousel_gallery"
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
