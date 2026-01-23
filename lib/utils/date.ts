export function formatDate(date: string | number | Date, long = false): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: long ? 'long' : 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
