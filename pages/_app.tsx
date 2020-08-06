import '../styles.css'

function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>
  pageProps: any
}) {
  return <Component {...pageProps} />
}
export default App
