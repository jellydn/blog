import { render, screen } from '@testing-library/react';
import ResumePage from '../../pages/resume.pdf';

describe('ResumePage', () => {
    it('uses direct PDF links instead of an embedded browser viewer', () => {
        render(<ResumePage siteTitle="ProductsWay" />);

        expect(screen.queryByTitle('Resume PDF')).not.toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Download PDF' }),
        ).toHaveAttribute('href', '/files/resume.pdf');
        expect(
            screen.getByRole('link', { name: 'Open in new tab' }),
        ).toHaveAttribute('href', '/files/resume.pdf');
    });
});
