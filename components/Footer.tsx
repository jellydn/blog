import { GitHubIcon, TwitterIcon } from 'components/Icons';
import Link from 'next/link';

const CURRENT_YEAR = new Date().getFullYear();

const socialLinks = [
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
];

const siteLinks = [
    { name: 'Home', href: '/' },
    { name: 'Notes', href: '/notes' },
    { name: 'Videos', href: '/videos' },
    { name: 'Blog', href: 'https://blog.productsway.com/', external: true },
];

const extraLinks = [
    { name: 'Resume', href: '/resume.pdf' },
    {
        name: 'Upwork',
        href: 'https://www.upwork.com/freelancers/~01b1a6f7c757b5ec48',
    },
    { name: 'ITMan Shop', href: 'https://bit.ly/m/itman' },
    { name: 'YouTube', href: 'https://www.youtube.com/c/ITManVietnam' },
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
                            {siteLinks.map((link) =>
                                (link as { external?: boolean }).external ? (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ),
                            )}
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
                                        className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                                    >
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
