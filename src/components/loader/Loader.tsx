import type { ReactNode } from 'react';

import styles from './styles.module.scss';

export function Loader(): ReactNode {
  return (
    <main className={styles.main}>
      <div className={styles.loader}>
        <div className={styles.weapon} />
      </div>
    </main>
  );
}
