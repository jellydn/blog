import 'prismjs/themes/prism-okaidia.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles.css';

import '../flags/config';
import { ThemeProvider } from '../lib/useTheme';

interface SecurityPageProps {
    nonce?: string;
}

const MyApp: React.FC<AppProps<SecurityPageProps>> = ({
    Component,
    pageProps,
}) => (
    <ThemeProvider nonce={pageProps.nonce}>
        <div>
            <Script
                src="https://gc.zgo.at/count.js"
                data-goatcounter="https://dunghd.goatcounter.com/count"
                strategy="afterInteractive"
                nonce={pageProps.nonce}
            />
            <Script
                src="https://cloud.umami.is/script.js"
                data-website-id="94f78c78-3384-4c3b-9a26-a9cde3b9075f"
                strategy="afterInteractive"
                nonce={pageProps.nonce}
            />
            <Component {...pageProps} />
        </div>
    </ThemeProvider>
);

export default MyApp;
