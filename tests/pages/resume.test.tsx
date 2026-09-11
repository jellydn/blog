import { render, screen } from '@testing-library/react';
import ResumePage from '../../pages/resume.pdf';

describe('ResumePage', () => {
    it('uses direct PDF links instead of an embedded browser viewer', () => {
        const { container } = render(<ResumePage siteTitle="ProductsWay" />);
        const downloadLink = screen.getByRole('link', {
            name: 'Download PDF',
        });
        const openLink = screen.getByRole('link', {
            name: 'Open in new tab',
        });

        expect(container.querySelector('iframe')).not.toBeInTheDocument();
        expect(downloadLink).toHaveAttribute('href', '/files/resume.pdf');
        expect(downloadLink).toHaveAttribute('download');
        expect(openLink).toHaveAttribute('href', '/files/resume.pdf');
        expect(openLink).toHaveAttribute('target', '_blank');
    });
});
