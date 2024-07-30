import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { IThemeContext } from '../contexts/types';

export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
