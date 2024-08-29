import 'prismjs/themes/prism-okaidia.css';

import type { AppProps } from 'next/app';

import '../styles.css';

import '../flags/config';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <div data-theme="dark">
        <script
            data-goatcounter="https://dunghd.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
        />
        <Component {...pageProps} />
    </div>
);

export default MyApp;
