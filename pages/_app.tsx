import 'prismjs/themes/prism-okaidia.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles.css';

import '../flags/config';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <div data-theme="dark">
        <Script
            src="https://dunghd.goatcounter.com/count"
            data-goatcounter="https://dunghd.goatcounter.com/count"
            strategy="afterInteractive"
        />
        <Script
            src="https://analytics.umami.is/script.js"
            data-website-id="94f78c78-3384-4c3b-9a26-a9cde3b9075f"
            strategy="afterInteractive"
        />
        <Component {...pageProps} />
    </div>
);

export default MyApp;
