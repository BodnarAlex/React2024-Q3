import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <div className={styles.container}>Star Wars</div>
      </header>
    );
  }
}
