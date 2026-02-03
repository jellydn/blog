import Layout from 'components/Layout';
import { NextSeo } from 'next-seo';

type ResumePageProps = {
    siteTitle: string;
};

const ResumePage = ({ siteTitle }: ResumePageProps) => {
    const description =
        'Download the resume of Dung Huynh Duc, Senior Full Stack Software Engineer.';
    const seoTitle = `Resume | ${siteTitle}`;
    const resumeUrl = '/files/resume.pdf';

    return (
        <Layout siteTitle={siteTitle} siteDescription={description}>
            <NextSeo
                title={seoTitle}
                description={description}
                canonical="https://productsway.com/resume.pdf"
                openGraph={{
                    type: 'website',
                    url: 'https://productsway.com/resume.pdf',
                    title: seoTitle,
                    description,
                    images: [
                        {
                            url: 'https://productsway.com/uploads/productsway.jpeg',
                            alt: seoTitle,
                        },
                    ],
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />

            <div>
                <section className="py-12 md:py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Resume
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            A quick overview and the latest PDF download.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                className="btn btn-primary"
                                href={resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                download
                            >
                                Download PDF
                            </a>
                            <a
                                className="btn btn-ghost"
                                href={resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open in new tab
                            </a>
                        </div>
                    </div>
                </section>

                <section className="py-8 md:py-12 bg-base-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="aspect-[4/5] w-full rounded-xl overflow-hidden border border-base-300 shadow-sm bg-base-200">
                            <iframe
                                title="Resume PDF"
                                src={resumeUrl}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ResumePage;

export async function getStaticProps() {
    const config = await import('../data/config.json');

    return {
        props: {
            siteTitle: config.default.title,
        },
    };
}
