import Document, {
    Html,
    Head,
    Main,
    NextScript,
    type DocumentContext,
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
                        defer
                        src="https://analytics.umami.is/script.js"
                        data-website-id="94f78c78-3384-4c3b-9a26-a9cde3b9075f"
                    />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
