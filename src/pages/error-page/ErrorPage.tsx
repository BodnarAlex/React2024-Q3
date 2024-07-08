import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class ErrorPage extends Component {
  public render(): ReactNode {
    return (
      <main className={styles.main}>
        <h1 className={styles.header}>Error!</h1>
      </main>
    );
  }
}
