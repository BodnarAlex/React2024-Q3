import type { ReactNode } from 'react';
import { ErrorButton } from '@/components/error-button/ErrorButton.tsx';

import styles from './styles.module.scss';

export function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <ErrorButton />
      <div className={styles.container} />
      <div className={styles.empty} />
    </header>
  );
}
