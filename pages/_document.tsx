import Document, {
    type DocumentContext,
    type DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';

interface DocumentProps extends DocumentInitialProps {
    nonce?: string;
}

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
        const initialProps = await Document.getInitialProps(ctx);
        const nonce = ctx.req?.headers['x-nonce'] as string | undefined;

        return { ...initialProps, nonce };
    }

    render() {
        const { nonce } = this.props;

        return (
            <Html lang="en" suppressHydrationWarning>
                <Head nonce={nonce} />
                <body>
                    <Main />
                    <NextScript nonce={nonce} />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
