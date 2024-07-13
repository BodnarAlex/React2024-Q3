import type { ReactNode } from 'react';
import styles from './styles.module.scss';

export function NotFound(): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}>This is</h1>
      <div className={styles.dart}>
        <div className={styles.error}>404</div>
      </div>
      <button className={styles.refreshBtn} type="button">
        Return on other side
      </button>
    </main>
  );
}
