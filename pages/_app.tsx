import { AppProps } from 'next/app'

import 'prismjs/themes/prism-okaidia.css'

import '../styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
