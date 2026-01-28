'use client';

import {
    ThemeProvider as NextThemesProvider,
    useTheme as useNextTheme,
} from 'next-themes';

type Theme = 'minimal' | 'dark';

// Export provider wrapper with DaisyUI-compatible configuration
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

// Export custom hook that matches the existing API
export function useTheme() {
    const { theme, setTheme } = useNextTheme();
    return {
        theme: theme as Theme,
        setTheme: setTheme as (theme: Theme) => void,
        toggleTheme: () => {
            setTheme(theme === 'minimal' ? 'dark' : 'minimal');
        },
    };
}
