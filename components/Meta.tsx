import Head from 'next/head';

export default function Meta({
    siteTitle,
    siteDescription,
}: {
    siteTitle: string;
    siteDescription: string;
}) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content="/og-image.png" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content="/og-image.png" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-icon-180x180.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/android-icon-192x192.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
                name="msapplication-TileImage"
                content="/ms-icon-144x144.png"
            />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
}
