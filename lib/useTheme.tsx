import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'minimal' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('minimal');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Get saved preference or default to 'minimal'
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved && (saved === 'minimal' || saved === 'dark')) {
            setThemeState(saved);
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'minimal' ? 'dark' : 'minimal');
    };

    // Prevent hydration mismatch by rendering children with the theme
    // After mount, we apply the actual theme
    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
