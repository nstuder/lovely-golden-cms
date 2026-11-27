/** Logo + name in the navigation bar, links to the home page. */
export const Brand = () => (
    <a
        className="flex items-center gap-2 text-white transition-opacity hover:opacity-85"
        href="/"
        aria-label="Moments of Love Logo - Home"
    >
        <img
            className="-mt-1.5"
            height={34}
            width={40}
            src="/assets/img/logo-dark-medium.svg"
            alt="Moments of Love Logo"
        />
        <span className="font-display text-3xl whitespace-nowrap">
            Moments of Love
        </span>
    </a>
)
