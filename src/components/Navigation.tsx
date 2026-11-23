import type { Navigation as NavigationType } from '@/cms/payload-types'

type Item = NonNullable<NavigationType['items']>[number]
type InternalLink = Item['pageIntern']

const internalHref = (link?: InternalLink) =>
    link?.value && typeof link.value === 'object' ? link.value.slug : undefined

const itemHref = (item: Item) =>
    item.linkType === 'external'
        ? item.pageExtern
        : item.linkType === 'internal'
        ? internalHref(item.pageIntern)
        : undefined

/** Main navigation bar (components/navigation.hbs). */
export const Navigation = ({ items }: { items?: Item[] | null }) => (
    <nav className="navbar sticky-top navbar-expand-lg font-weight-bold navbar-dark bg-primary">
        <a className="visually-hidden-focusable text-white" href="#inhalt">
            <div className="container">Navigation überspringen</div>
        </a>
        <div className="container">
            <a
                className="navbar-brand"
                href="/"
                aria-label="Moments of Love Logo - Home"
            >
                <img
                    className="mr-2"
                    style={{ marginTop: '-0.5rem' }}
                    height={34}
                    width={40}
                    src="/assets/img/logo-dark-medium.svg"
                    alt="Moments of Love Logo"
                />
                <span className="main-font fs-2">Moments of Love</span>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainnav"
                aria-controls="mainnav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mt-2" id="mainnav">
                <ul className="navbar-nav mr-auto">
                    {items?.map((item, i) => {
                        if (item.type === 'link') {
                            return (
                                <li className="nav-item" key={item.id ?? i}>
                                    <a
                                        className="nav-link"
                                        href={itemHref(item) ?? undefined}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                        }
                        if (item.type === 'subMenu') {
                            return (
                                <li
                                    className="nav-item dropdown"
                                    key={item.id ?? i}
                                >
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id={`navbarDropdown-${item.label}`}
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {item.label}
                                    </a>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby={`navbarDropdown-${item.label}`}
                                    >
                                        {item.subMenu?.items?.map(
                                            (subItem, j) => (
                                                <a
                                                    key={subItem.id ?? j}
                                                    className="dropdown-item"
                                                    href={
                                                        (subItem.linkType ===
                                                        'external'
                                                            ? subItem.slugExtern
                                                            : subItem.linkType ===
                                                              'internal'
                                                            ? internalHref(
                                                                  subItem.slugIntern
                                                              )
                                                            : undefined) ??
                                                        undefined
                                                    }
                                                >
                                                    {subItem.label}
                                                </a>
                                            )
                                        )}
                                    </div>
                                </li>
                            )
                        }
                        return null
                    })}
                </ul>
            </div>
        </div>
    </nav>
)
