import { AppProps } from 'next/app';
import 'prismjs/themes/prism-okaidia.css';

import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <div data-theme="dark">
        <Component {...pageProps} />
    </div>
);

export default MyApp;
