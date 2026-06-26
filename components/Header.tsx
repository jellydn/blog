import {
    CloseIcon,
    GitHubIcon,
    LinkedInIcon,
    MenuIcon,
    MoonIcon,
    SunIcon,
    TwitterIcon,
} from 'components/Icons';
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
    { name: 'Posts', href: '/posts' },
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
        icon: <GitHubIcon />,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/jellydn',
        icon: <TwitterIcon />,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/dung-huynh-duc',
        icon: <LinkedInIcon />,
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
        {isDark ? <SunIcon /> : <MoonIcon />}
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
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
                                <button
                                    key={social.name}
                                    type="button"
                                    onClick={closeMenu}
                                    className="p-2 text-base-content/70 hover:text-primary transition-colors"
                                >
                                    <SocialLinkItem social={social} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
