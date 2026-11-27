import type { Configuration } from '@/cms/payload-types'
import { Image } from '@/components/atoms'

/**
 * The footnote from the CMS without a leading copyright sign, year or
 * "Copyright" ("2024 Copyright: Moments of Love" -> "Moments of Love"),
 * the footer puts the current year in front itself.
 */
export const stripCopyright = (footnote?: string | null) =>
    (footnote ?? '')
        .replace(
            /^(\s*(©|\(c\)|copyright|\d{4}(\s*[-–]\s*\d{4})?)[\s:,.-]*)+/i,
            ''
        )
        .trim()

/** Club logos + copyright with the current year (partials/footer.hbs). */
export const Footer = ({ configuration }: { configuration: Configuration }) => (
    <footer className="mt-16 bg-plum/95 px-4 pt-10 pb-6 text-white">
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
        <div className="container-page mt-8 border-t border-white/20 pt-5 text-center text-sm text-white/90">
            © {new Date().getFullYear()}{' '}
            {stripCopyright(configuration.footnote)}
            <span aria-hidden="true"> · </span>
            <a
                className="underline underline-offset-2 hover:text-white"
                href="/datenschutz"
            >
                Datenschutz
            </a>
        </div>
    </footer>
)
