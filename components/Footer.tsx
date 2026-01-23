import Link from 'next/link';

const CURRENT_YEAR = new Date().getFullYear();

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/jellydn',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/jellydn',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

const siteLinks = [
    { name: 'Home', href: '/' },
    { name: 'Notes', href: '/notes' },
    { name: 'Videos', href: '/videos' },
];

const extraLinks = [
    {
        name: 'Resume',
        href: '/resume.pdf',
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
    },
    {
        name: 'Upwork',
        href: 'https://www.upwork.com/freelancers/~01b1a6f7c757b5ec48',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.077.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.703-2.704 2.703zm0-7.347c-2.552 0-4.627 2.075-4.627 4.627 0 2.551 2.075 4.627 4.627 4.627s4.627-2.076 4.627-4.627c0-2.552-2.075-4.627-4.627-4.627zM8.273 21.973v-6.36c0-1.536-.936-2.602-2.226-2.99-.827-.248-1.55-.231-2.076-.024l.009.031c.318.929.625 2.309.483 3.58-.18 1.648-1.346 2.96-2.648 3.525-.321.137-.665.206-.645.559.016.283.178.496.41.609 1.336.641 2.522 1.278 3.926 2.267.539.377 1.054.957 1.393 1.635.228-.492.369-1.048.369-1.653 0-.571-.129-1.111-.359-1.604l.001-.003c-.023-.051-.049-.102-.074-.151l-4.349-9.075c-.522-1.09-1.628-1.785-2.839-1.785-1.746 0-3.162 1.416-3.162 3.162 0 .34.056.666.157.972L4.986 19.6c.353.821 1.168 1.394 2.119 1.394 1.27 0 2.309-1.01 2.356-2.269l.013-.007.012-.048-.012-.047-.013-.007c-.047-1.259-1.086-2.269-2.356-2.269-.949 0-1.764.572-2.117 1.392L1.005 9.96c-.102-.306-.158-.632-.158-.972 0-1.746 1.416-3.162 3.162-3.162 1.211 0 2.317.695 2.839 1.785l4.349 9.075c.025.049.051.1.074.151l-.001.003c.23.493.359 1.033.359 1.604 0 .605-.141 1.161-.369 1.653-.338-.677-.854-1.257-1.393-1.635-1.404-.989-2.59-1.626-3.926-2.267-.232-.113-.394-.326-.41-.609-.02-.353.324-.422.645-.559 1.302-.565 2.468-1.877 2.648-3.525.142-1.271-.165-2.651-.483-3.58l-.009-.031c.526-.207 1.249-.224 2.076.024 1.29.388 2.226 1.454 2.226 2.99v6.36c-.76.112-1.552.188-2.358.188-1.746 0-3.162-1.416-3.162-3.162s1.416-3.162 3.162-3.162c1.747 0 3.162 1.416 3.162 3.162s-1.415 3.162-3.162 3.162c.806 0 1.598-.076 2.358-.188z" />
            </svg>
        ),
    },
    {
        name: 'ITMan Shop',
        href: 'https://bit.ly/m/itman',
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/c/ITManVietnam',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
];

function Footer() {
    return (
        <footer className="border-t border-base-300 mt-auto bg-base-100">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="font-semibold text-base-content mb-3">
                            ProductsWay
                        </h3>
                        <p className="text-sm text-base-content/70">
                            Thoughts, tutorials, TILs, and videos for
                            developers.
                        </p>
                    </div>

                    {/* Site Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-base-content mb-3">
                            Explore
                        </h4>
                        <ul className="space-y-2">
                            {siteLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Extra Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-base-content mb-3">
                            More
                        </h4>
                        <ul className="space-y-2">
                            {extraLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-base-content/70 hover:text-base-content transition-colors inline-flex items-center gap-2"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-base-content mb-3">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base-content/70 hover:text-base-content transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-8 border-t border-base-300">
                    <p className="text-sm text-base-content/70 text-center">
                        © {CURRENT_YEAR} ProductsWay. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
