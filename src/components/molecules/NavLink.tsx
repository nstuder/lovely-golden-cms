type Props = { label: string; href?: string }

/** Link style of the main navigation (also used in dropdowns on mobile). */
export const NAV_LINK_CLASS =
    'block rounded-md px-3 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white'

/** Simple entry of the main navigation. */
export const NavLink = ({ label, href }: Props) => (
    <li>
        <a className={NAV_LINK_CLASS} href={href}>
            {label}
        </a>
    </li>
)
