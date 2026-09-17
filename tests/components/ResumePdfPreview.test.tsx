import { render } from '@testing-library/react';
import { ResumePdfPreview } from 'components/ResumePdfPreview';

describe('ResumePdfPreview', () => {
    it('embeds the PDF with the in-page viewer hash', () => {
        const { container } = render(
            <ResumePdfPreview src="/files/resume.pdf" />,
        );
        const preview = container.querySelector('iframe');

        expect(preview).toHaveAttribute('title', 'Resume PDF');
        expect(preview).toHaveAttribute(
            'src',
            '/files/resume.pdf#toolbar=1&navpanes=0',
        );
    });
});
