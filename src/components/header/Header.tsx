import type { ReactNode } from 'react';
import { Component } from 'react';
import { Search } from '@/components/search/Search.tsx';
import { ErrorButton } from '@/components/error-button/ErrorButton.tsx';

import styles from './styles.module.scss';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <ErrorButton />
        <div className={styles.container} />
        <Search />
      </header>
    );
  }
}
