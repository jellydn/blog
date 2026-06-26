import '@testing-library/jest-dom/vitest';

// Mock next/image
vi.mock('next/image', () => ({
    default: function MockImage({
        src,
        alt,
        width,
        height,
        ...props
    }: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    }) {
        return (
            // biome-ignore lint/performance/noImgElement: mock for next/image in test environment
            <img src={src} alt={alt} width={width} height={height} {...props} />
        );
    },
}));

// Mock next/head
vi.mock('next/head', () => ({
    default: function MockHead({ children }: { children: React.ReactNode }) {
        return <>{children}</>;
    },
}));

// Mock next/script
vi.mock('next/script', () => ({
    default: function MockScript(props: Record<string, unknown>) {
        return <script {...props} />;
    },
}));
