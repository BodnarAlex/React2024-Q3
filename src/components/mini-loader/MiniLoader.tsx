import type { ReactNode } from 'react';
import styles from './styles.module.scss';

export function MiniLoader(): ReactNode {
  return (
    <div className={styles.mini}>
      <div className={styles.weapon} />
    </div>
  );
}
