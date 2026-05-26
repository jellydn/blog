import type { GetServerSideProps } from 'next';

const BLOG_URL = 'https://blog.productsway.com';

export default function RootSlugRedirect() {
    // This page always redirects server-side
    return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = (params?.slug as string) ?? '';

    return {
        redirect: {
            destination: `${BLOG_URL}/${slug}`,
            permanent: false,
        },
    };
};
