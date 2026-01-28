import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

const Layout: React.FC<{
    siteTitle: string;
    siteDescription?: string;
    children: React.ReactNode;
}> = ({ siteTitle, siteDescription, children }) => (
    <>
        <Meta siteTitle={siteTitle} siteDescription={siteDescription} />
        <main className="font-sans bg-base-100 text-base-content">
            <Header siteTitle={siteTitle} />
            {children}
            <Footer />
        </main>
    </>
);

export default Layout;
