type Props = {
    totalPages: number
    /** highlighted page, none if undefined */
    activePage?: number
    prevPage?: number | null
    nextPage?: number | null
    /** links are `${basePath}/${page}` */
    basePath: string
}

/** Bootstrap pagination with previous/next arrows. */
export const Pagination = ({
    totalPages,
    activePage,
    prevPage,
    nextPage,
    basePath,
}: Props) => (
    <nav aria-label="Seiten Navigation">
        <ul className="pagination justify-content-center">
            {prevPage && (
                <li className="page-item">
                    <a
                        className="page-link"
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
                    <li
                        key={number}
                        className={`page-item ${isActive ? 'active' : ''}`}
                    >
                        <a
                            className="page-link"
                            href={`${basePath}/${number}`}
                            aria-label={`Seite ${number}`}
                            aria-current={isActive ? 'true' : 'false'}
                        >
                            {number}
                        </a>
                    </li>
                )
            })}
            {nextPage && (
                <li className="page-item">
                    <a
                        className="page-link"
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
