type Props = {
    /** id of the tab pane (without `#`) */
    target: string
    label: string
    active?: boolean
}

/** Entry of a Bootstrap tab navigation. */
export const TabLink = ({ target, label, active }: Props) => (
    <li className="nav-item">
        <a
            className={active ? 'nav-link active' : 'nav-link'}
            data-bs-toggle="tab"
            href={`#${target}`}
        >
            {label}
        </a>
    </li>
)
