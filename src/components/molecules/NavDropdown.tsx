import type { Navigation } from '@/cms/payload-types'
import { linkHref } from '@/lib/links'

type SubItem = NonNullable<
    NonNullable<NonNullable<Navigation['items']>[number]['subMenu']>['items']
>[number]

type Props = { label: string; items?: SubItem[] | null }

/** Navigation entry with a dropdown menu. */
export const NavDropdown = ({ label, items }: Props) => (
    <li className="nav-item dropdown">
        <a
            className="nav-link dropdown-toggle"
            href="#"
            id={`navbarDropdown-${label}`}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {label}
        </a>
        <div
            className="dropdown-menu"
            aria-labelledby={`navbarDropdown-${label}`}
        >
            {items?.map((item, i) => (
                <a
                    key={item.id ?? i}
                    className="dropdown-item"
                    href={linkHref(
                        item.linkType,
                        item.slugExtern,
                        item.slugIntern
                    )}
                >
                    {item.label}
                </a>
            ))}
        </div>
    </li>
)
