import type { Navigation as NavigationType } from '@/cms/payload-types'
import { Brand } from '@/components/atoms'
import { NavDropdown, NavLink } from '@/components/molecules'
import { linkHref } from '@/lib/links'

type Item = NonNullable<NavigationType['items']>[number]

/** Main navigation bar (components/navigation.hbs). */
export const Navigation = ({ items }: { items?: Item[] | null }) => (
    <nav className="navbar sticky-top navbar-expand-lg font-weight-bold navbar-dark bg-primary">
        <a className="visually-hidden-focusable text-white" href="#inhalt">
            <div className="container">Navigation überspringen</div>
        </a>
        <div className="container">
            <Brand />
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
                        const key = item.id ?? i
                        if (item.type === 'link') {
                            return (
                                <NavLink
                                    key={key}
                                    label={item.label}
                                    href={linkHref(
                                        item.linkType,
                                        item.pageExtern,
                                        item.pageIntern
                                    )}
                                />
                            )
                        }
                        if (item.type === 'subMenu') {
                            return (
                                <NavDropdown
                                    key={key}
                                    label={item.label}
                                    items={item.subMenu?.items}
                                />
                            )
                        }
                        return null
                    })}
                </ul>
            </div>
        </div>
    </nav>
)
