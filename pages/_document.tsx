import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
                        crossOrigin="anonymous"
                    />
                    <script
                        src="https://giscus.app/client.js"
                        data-repo="jellydn/blog"
                        data-repo-id="MDEwOlJlcG9zaXRvcnkyODM1MjQ3NTE="
                        data-category="Ideas"
                        data-category-id="DIC_kwDOEOY-j84CQqDK"
                        data-mapping="pathname"
                        data-strict="1"
                        data-reactions-enabled="1"
                        data-emit-metadata="0"
                        data-input-position="top"
                        data-theme="dark"
                        data-lang="en"
                        data-loading="lazy"
                        crossOrigin="anonymous"
                        async
                    />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
