'use client';

import {
    ThemeProvider as NextThemesProvider,
    useTheme as useNextTheme,
} from 'next-themes';

type Theme = 'minimal' | 'dark';

interface ThemeProviderProps {
    children: React.ReactNode;
    nonce?: string;
}

export function ThemeProvider({
    children,
    nonce,
}: ThemeProviderProps): React.JSX.Element {
    return (
        <NextThemesProvider
            themes={['minimal', 'dark']}
            defaultTheme="minimal"
            storageKey="theme"
            enableSystem={false}
            attribute="data-theme"
            nonce={nonce}
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
