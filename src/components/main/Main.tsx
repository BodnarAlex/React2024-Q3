import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';

export class Main extends Component {
  public render(): ReactNode {
    return <main className={styles.main}>this main</main>;
  }
}
