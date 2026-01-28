'use client';

import {
    ThemeProvider as NextThemesProvider,
    useTheme as useNextTheme,
} from 'next-themes';

type Theme = 'minimal' | 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            themes={['minimal', 'dark']}
            defaultTheme="minimal"
            storageKey="theme"
            enableSystem={false}
            attribute="data-theme"
        >
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    const { theme, setTheme } = useNextTheme();
    return {
        theme: (theme ?? 'minimal') as Theme,
        setTheme: setTheme as (theme: Theme) => void,
        toggleTheme: () => {
            const current = theme ?? 'minimal';
            setTheme(current === 'minimal' ? 'dark' : 'minimal');
        },
    };
}
