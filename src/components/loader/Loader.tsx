import type { ReactNode } from 'react';
import styles from './styles.module.scss';

export function Loader(): ReactNode {
  return (
    <main className='main'>
      <div className={styles.weapon} />
    </main>
  );
}
