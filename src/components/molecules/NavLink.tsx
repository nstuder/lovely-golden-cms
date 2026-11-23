type Props = { label: string; href?: string }

/** Simple entry of the main navigation. */
export const NavLink = ({ label, href }: Props) => (
    <li className="nav-item">
        <a className="nav-link" href={href}>
            {label}
        </a>
    </li>
)
