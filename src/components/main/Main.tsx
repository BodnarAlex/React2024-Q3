import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';

export class Main extends Component {
  public render(): ReactNode {
    return (
      <main className={styles.main}>
        <div className={styles.card}>1</div>
        <div className={styles.card}>2</div>
        <div className={styles.card}>3</div>
      </main>
    );
  }
}
