import { describe, expect, it } from 'vitest';
import { formatDate, reformatDate } from '../../lib/utils/date';

describe('formatDate', () => {
    it('formats a date string with short month', () => {
        expect(formatDate('2024-03-15')).toBe('Mar 15, 2024');
    });

    it('formats a Date object', () => {
        expect(formatDate(new Date('2024-03-15'))).toBe('Mar 15, 2024');
    });

    it('formats a timestamp number', () => {
        expect(formatDate(1710460800000)).toBe('Mar 15, 2024');
    });

    it('uses long month when long is true', () => {
        expect(formatDate('2024-03-15', true)).toBe('March 15, 2024');
    });

    it('handles end of year dates', () => {
        expect(formatDate('2024-12-31')).toBe('Dec 31, 2024');
    });
});

describe('reformatDate', () => {
    it('reformats a full ISO date string', () => {
        const result = reformatDate('2024-03-15T10:30:00Z');
        expect(result).toMatch(/Mar 15 2024/);
    });

    it('reformats a date-only string', () => {
        const result = reformatDate('2024-03-15');
        expect(result).toMatch(/Mar 15 2024/);
    });

    it('returns the original string for invalid dates', () => {
        expect(reformatDate('not-a-date')).toBe('not-a-date');
    });

    it('returns the original string for empty string', () => {
        expect(reformatDate('')).toBe('');
    });
});
