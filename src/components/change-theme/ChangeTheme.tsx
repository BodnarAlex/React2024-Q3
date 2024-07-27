import type { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme.ts';
import styles from './styles.module.scss';

export function ChangeTheme(): ReactNode {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className={styles.themeButton}>
      {theme === 'light' ? 'to Dark Mode' : 'to Light Mode'}
    </button>
  );
}
