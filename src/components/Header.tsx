import type {
    Configuration,
    Navigation as NavigationType,
} from '@/cms/payload-types'
import { Image } from './Image'
import { Navigation } from './Navigation'

type Props = {
    navigation: NavigationType
    configuration: Configuration
}

/** Navigation + header carousel (partials/header.hbs). */
export const Header = ({ navigation, configuration }: Props) => (
    <>
        <Navigation items={navigation.items} />
        <header className="head">
            <div
                id="carouselDogs"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <ol className="carousel-indicators d-none d-sm-flex">
                    {configuration.images?.map((item, i) => (
                        <li
                            key={item.id ?? i}
                            data-bs-target="#carouselDogs"
                            data-bs-slide-to={i}
                            className={i === 0 ? 'active' : ''}
                        ></li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {configuration.images?.map((item, i) => (
                        <div
                            key={item.id ?? i}
                            className={`carousel-item ${
                                i === 0 ? 'active' : ''
                            }`}
                        >
                            <Image image={item.image} className="w-100" />
                        </div>
                    ))}
                </div>
                <a
                    className="carousel-control-prev"
                    href="#carouselDogs"
                    role="button"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Vorheriges Bild</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselDogs"
                    role="button"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Nächstes Bild</span>
                </a>
            </div>
        </header>
    </>
)
