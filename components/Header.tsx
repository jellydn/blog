import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../lib/useTheme';

type NavLink = {
    name: string;
    href: string;
    external?: boolean;
};

const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Notes', href: '/notes' },
    { name: 'Videos', href: '/videos' },
    { name: 'Blog', href: 'https://blog.productsway.com/', external: true },
];

type SocialLink = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
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

const ThemeToggleButton = ({
    isDark,
    toggleTheme,
}: {
    isDark: boolean;
    toggleTheme: () => void;
}) => (
    <button
        type="button"
        onClick={toggleTheme}
        className="text-base-content/70 hover:text-primary transition-colors"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
        {isDark ? (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        ) : (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        )}
    </button>
);

const NavLinkItem = ({
    link,
    onClick,
}: {
    link: NavLink;
    onClick?: () => void;
}) =>
    link.external ? (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-base-content/70 hover:text-primary transition-colors"
            onClick={onClick}
        >
            {link.name}
        </a>
    ) : (
        <Link
            href={link.href}
            className="text-sm text-base-content/70 hover:text-primary transition-colors"
            onClick={onClick}
        >
            {link.name}
        </Link>
    );

const SocialLinkItem = ({ social }: { social: SocialLink }) => (
    <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base-content/70 hover:text-primary transition-colors"
        aria-label={social.name}
    >
        {social.icon}
    </a>
);

export default function Header({ siteTitle }: { siteTitle: string }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold text-base-content hover:text-primary transition-colors"
                    >
                        <Image
                            src="/logo.svg"
                            alt="ITMan Logo"
                            width={80}
                            height={24}
                            priority
                        />
                        <span>{siteTitle}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <NavLinkItem key={link.href} link={link} />
                        ))}
                    </nav>

                    {/* Social Links - Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggleButton
                            isDark={isDark}
                            toggleTheme={toggleTheme}
                        />
                        {socialLinks.map((social) => (
                            <SocialLinkItem key={social.name} social={social} />
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-base-content/70 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            suppressHydrationWarning
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-base-300">
                        <nav className="flex flex-col space-y-4 mb-4">
                            {navLinks.map((link) => (
                                <NavLinkItem
                                    key={link.href}
                                    link={link}
                                    onClick={closeMenu}
                                />
                            ))}
                        </nav>
                        <div className="flex gap-4 pt-4 border-t border-base-300">
                            <ThemeToggleButton
                                isDark={isDark}
                                toggleTheme={toggleTheme}
                            />
                            {socialLinks.map((social) => (
                                <div key={social.name} onClick={closeMenu}>
                                    <SocialLinkItem social={social} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
