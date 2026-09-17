interface ResumePdfPreviewProps {
    src: string;
}

export function ResumePdfPreview({ src }: ResumePdfPreviewProps) {
    const previewSrc = `${src}#toolbar=1&navpanes=0`;

    return (
        <div className="w-full overflow-hidden rounded-xl border border-base-300 bg-base-200 shadow-sm">
            <iframe
                title="Resume PDF"
                src={previewSrc}
                className="block h-[80vh] w-full bg-base-100"
            />
        </div>
    );
}
