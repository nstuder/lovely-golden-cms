import type { Configuration } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

/** Club logos + footnote (partials/footer.hbs). */
export const Footer = ({ configuration }: { configuration: Configuration }) => (
    <footer className="mt-12 bg-plum/95 px-4 pt-6 pb-4 text-white">
        <div className="container-page flex items-center justify-evenly gap-4">
            {configuration.clubs?.map((club, i) => (
                <a
                    key={club.id ?? i}
                    href={club.link ?? undefined}
                    className="flex h-14 w-1/5 max-w-36 items-center justify-center transition-opacity hover:opacity-80 sm:h-20"
                    aria-label={club.name ?? undefined}
                >
                    <Image
                        image={club.image}
                        sizes="(min-width: 768px) 144px, 20vw"
                        className="max-h-full w-auto"
                    />
                </a>
            ))}
        </div>
        <div className="mt-6 text-center text-sm text-white/90">
            {configuration.footnote}{' '}
            <a
                className="underline underline-offset-2 hover:text-white"
                href="/datenschutz"
            >
                Datenschutz
            </a>
        </div>
    </footer>
)
