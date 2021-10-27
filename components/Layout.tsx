import Footer from './Footer';
import Header from './Header';
import HeroIntro from './HeroIntro';
import Meta from './Meta';
import Projects from './Projects';

const Layout: React.FC<{
    siteTitle: string;
    siteDescription?: string;
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
);

export default Layout;
