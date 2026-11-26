import type { Configuration } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

/** Club logos + footnote (partials/footer.hbs). */
export const Footer = ({ configuration }: { configuration: Configuration }) => (
    <footer className="page-footer bg-primary p-2">
        <div className="row justify-content-evenly">
            {configuration.clubs?.map((club, i) => (
                <a
                    key={club.id ?? i}
                    href={club.link ?? undefined}
                    className="col-3 col-md-2 block d-flex justify-content-center align-items-center"
                    aria-label={club.name ?? undefined}
                >
                    <Image
                        image={club.image}
                        sizes="(min-width: 768px) 17vw, 25vw"
                        className="h-50 block w-auto"
                    />
                </a>
            ))}
        </div>
        <div className="text-center text-white p-3">
            {configuration.footnote}{' '}
            <a className="text-white" href="/datenschutz">
                Datenschutz
            </a>
        </div>
    </footer>
)
