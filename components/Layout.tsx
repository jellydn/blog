/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'
import HeroIntro from './HeroIntro'
import Projects from './Projects'

const Layout: React.FC<{
  siteTitle: string
  siteDescription?: string
}> = ({ siteTitle, siteDescription, children }) => (
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

export default Layout
