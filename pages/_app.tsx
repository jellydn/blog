import 'prismjs/themes/prism-okaidia.css';

import { AppProps } from 'next/app';

import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <div data-theme="dark">
        <Component {...pageProps} />
    </div>
);

export default MyApp;
