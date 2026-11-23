/** Logo + name in the navigation bar, links to the home page. */
export const Brand = () => (
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
)
