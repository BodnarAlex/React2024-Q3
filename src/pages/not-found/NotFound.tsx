import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export function NotFound(): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}>This is</h1>
      <div className={styles.dart}>
        <div className={styles.error}>404</div>
      </div>
      <Link to="/" className={styles.refreshBtn}>
        Return on other side
      </Link>
    </main>
  );
}
