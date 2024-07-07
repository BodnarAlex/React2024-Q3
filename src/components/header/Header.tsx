import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <button className={styles.button}>Error</button>
        <div className={styles.container} />
        <input type="search" name="search" id="search" />
      </header>
    );
  }
}
