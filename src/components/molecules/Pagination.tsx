type Props = {
    totalPages: number
    /** highlighted page, none if undefined */
    activePage?: number
    prevPage?: number | null
    nextPage?: number | null
    /** links are `${basePath}/${page}` */
    basePath: string
}

const ITEM =
    'grid min-w-10 h-10 place-items-center rounded-full px-3 font-semibold transition-colors'
const IDLE = `${ITEM} bg-white/70 text-plum-dark hover:bg-plum hover:text-white`
const ACTIVE = `${ITEM} bg-plum text-white`

/** Page numbers with previous/next arrows. */
export const Pagination = ({
    totalPages,
    activePage,
    prevPage,
    nextPage,
    basePath,
}: Props) => (
    <nav aria-label="Seiten Navigation" className="my-8">
        <ul className="flex flex-wrap justify-center gap-2">
            {prevPage && (
                <li>
                    <a
                        className={IDLE}
                        href={`${basePath}/${prevPage}`}
                        aria-label="Vorherige Seite"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => {
                const number = index + 1
                const isActive = number === activePage
                return (
                    <li key={number}>
                        <a
                            className={isActive ? ACTIVE : IDLE}
                            href={`${basePath}/${number}`}
                            aria-label={`Seite ${number}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {number}
                        </a>
                    </li>
                )
            })}
            {nextPage && (
                <li>
                    <a
                        className={IDLE}
                        href={`${basePath}/${nextPage}`}
                        aria-label="Nächste Seite"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            )}
        </ul>
    </nav>
)
