export function formatDate(date: string | number | Date, long = false): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: long ? 'long' : 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function reformatDate(fullDate: string): string {
    const date = new Date(fullDate);
    if (Number.isNaN(date.getTime())) {
        return fullDate; // Return original input for invalid dates
    }
    return date.toDateString().slice(4);
}
