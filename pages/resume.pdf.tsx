import Layout from 'components/Layout';
import { ResumePdfPreview } from 'components/ResumePdfPreview';
import { getSiteConfig } from 'lib/config';
import { generateNextSeo, pageSeo } from 'lib/seo';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface ResumePageProps {
    siteTitle: string;
    nonce?: string;
}

const ResumePage = ({ siteTitle }: ResumePageProps) => {
    const description =
        'Download the resume of Dung Huynh Duc, Senior Full Stack Software Engineer.';
    const resumeUrl = '/files/resume.pdf';

    return (
        <Layout siteTitle={siteTitle} siteDescription={description}>
            {generateNextSeo(
                pageSeo({
                    title: `Resume | ${siteTitle}`,
                    description:
                        'Download the resume of Dung Huynh Duc, Senior Full Stack Software Engineer.',
                    path: '/resume.pdf',
                    image: 'https://productsway.com/uploads/productsway.jpeg',
                }),
            )}

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

                <section className="bg-base-100 py-8 md:py-12">
                    <div className="container mx-auto max-w-5xl px-4">
                        <ResumePdfPreview src={resumeUrl} />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ResumePage;

export async function getServerSideProps({
    req,
}: GetServerSidePropsContext): Promise<
    GetServerSidePropsResult<ResumePageProps>
> {
    const config = getSiteConfig();
    const nonce = req.headers['x-nonce'] as string | undefined;

    return {
        props: {
            siteTitle: config.title,
            nonce,
        },
    };
}
