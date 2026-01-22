// Shared date formatting utilities

export type DateFormatOptions = {
    month: 'short' | 'long' | 'numeric';
    day: 'numeric';
    year: 'numeric' | '2-digit';
};

const defaultOptions: DateFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};

const longMonthOptions: DateFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
};

export function reformatDate(
    fullDate: string | number | Date,
    options: DateFormatOptions = defaultOptions,
): string {
    const date = new Date(fullDate);
    return date.toLocaleDateString('en-US', options);
}

export function reformatDateShort(fullDate: string | number | Date): string {
    return reformatDate(fullDate, defaultOptions);
}

export function reformatDateLong(fullDate: string | number | Date): string {
    return reformatDate(fullDate, longMonthOptions);
}
