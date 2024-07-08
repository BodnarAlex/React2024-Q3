import type { ReactNode } from 'react';
import { Component } from 'react';
import { Search } from '@/components/search/Search.tsx';

import styles from './styles.module.scss';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <div className={styles.containerButton}>
          <button className={styles.button}>Error</button>
        </div>
        <div className={styles.container} />
        <Search />
      </header>
    );
  }
}
