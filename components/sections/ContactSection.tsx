import { Button } from 'components/Button';

type SocialLink = {
    name: string;
    url: string;
    ariaLabel: string;
    primary?: boolean;
};

const socialLinks: SocialLink[] = [
    {
        name: 'Hire Me',
        url: 'https://www.upwork.com/freelancers/~01b1a6f7c757b5ec48',
        ariaLabel: 'Hire me on Upwork',
        primary: true,
    },
    {
        name: 'Email',
        url: 'mailto:dung@productsway.com',
        ariaLabel: 'Send me an email',
    },
    {
        name: 'GitHub',
        url: 'https://github.com/jellydn',
        ariaLabel: 'View my GitHub profile',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/jellydn',
        ariaLabel: 'View my Twitter profile',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/dung-huynh-duc',
        ariaLabel: 'View my LinkedIn profile',
    },
];

export function ContactSection() {
    return (
        <section className="py-20 bg-base-200 border-t border-base-300">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <h2 className="text-4xl font-bold mb-4 text-base-content">
                    Let&apos;s Connect
                </h2>
                <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                    Interested in collaborating or have a question? Reach out
                    through any of these platforms.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    {socialLinks.map((social) => (
                        <Button
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            variant={social.primary ? 'primary' : 'outline'}
                            aria-label={social.ariaLabel}
                        >
                            {social.name}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
