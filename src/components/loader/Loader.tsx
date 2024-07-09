import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class Loader extends Component {
  public render(): ReactNode {
    return (
      <main className={styles.main}>
        <div className={styles.loader}>
          <div className={styles.weapon} />
        </div>
      </main>
    );
  }
}
