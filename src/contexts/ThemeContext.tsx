import type { ReactNode } from 'react';
import { createContext, useState, useMemo } from 'react';

interface IThemeContext {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
