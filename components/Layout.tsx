import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'
import HeroIntro from './HeroIntro'
import Projects from './Projects'

export default function Layout({
  siteTitle,
  siteDescription,
  children,
}: {
  siteTitle: string
  siteDescription?: string
  children?: any
}) {
  return (
    <>
      <Meta siteTitle={siteTitle} siteDescription={siteDescription} />
      <main className="font-sans bg-white">
        <div>
          <Header siteTitle={siteTitle} />
          <HeroIntro />
          {children}
          <Projects />
          <Footer />
        </div>
      </main>
    </>
  )
}
