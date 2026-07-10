import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import defaultTheme from '../../content/theme.json';
import type { SiteTheme } from './theme.types';

interface ThemeContextValue {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const CSS_VAR_MAP: Record<keyof SiteTheme['colors'], string> = {
  primary: '--color-primary',
  secondary: '--color-secondary',
  accent: '--color-accent',
  highlight: '--color-highlight',
  header: '--color-header',
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<SiteTheme>(defaultTheme as SiteTheme);

  useEffect(() => {
    const root = document.documentElement;
    for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
      root.style.setProperty(cssVar, theme.colors[key as keyof SiteTheme['colors']]);
    }
    root.style.setProperty('--font-body', `'${theme.font.body}', sans-serif`);
    root.style.setProperty('--radius-sm', theme.radii.sm);
    root.style.setProperty('--radius-md', theme.radii.md);
    root.style.setProperty('--radius-lg', theme.radii.lg);
    root.style.setProperty('--shadow-strength', theme.shadowsEnabled ? '1' : '0');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
