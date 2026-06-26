import { Button } from 'components/Button';
import Image from 'next/image';

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

export function HeroSection() {
    return (
        <section className="hero min-h-[60vh] bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <div className="avatar mb-6">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <Image
                                src="/avatar.jpg"
                                alt="Dung Huynh Duc"
                                width={128}
                                height={128}
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold">
                        Hi, I&apos;m{' '}
                        <span className="text-primary">Dung Huynh Duc</span>
                    </h1>
                    <p className="py-6 text-xl text-base-content/70">
                        Senior Full Stack Software Engineer at ACX. Building
                        blockchain-based carbon exchange platforms with
                        TypeScript, Node.js, and React.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {socialLinks.map((social) => (
                            <Button
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.ariaLabel}
                            >
                                {social.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
