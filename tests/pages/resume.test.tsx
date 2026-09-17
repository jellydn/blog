import { render, screen } from '@testing-library/react';
import ResumePage from '../../pages/resume.pdf';

describe('ResumePage', () => {
    it('embeds the resume PDF and keeps download links', () => {
        const { container } = render(<ResumePage siteTitle="ProductsWay" />);
        const downloadLink = screen.getByRole('link', {
            name: 'Download PDF',
        });
        const openLink = screen.getByRole('link', {
            name: 'Open in new tab',
        });
        const preview = container.querySelector('iframe');

        expect(preview).toHaveAttribute('title', 'Resume PDF');
        expect(preview).toHaveAttribute(
            'src',
            '/files/resume.pdf#toolbar=1&navpanes=0',
        );
        expect(downloadLink).toHaveAttribute('href', '/files/resume.pdf');
        expect(downloadLink).toHaveAttribute('download');
        expect(openLink).toHaveAttribute('href', '/files/resume.pdf');
        expect(openLink).toHaveAttribute('target', '_blank');
    });
});
