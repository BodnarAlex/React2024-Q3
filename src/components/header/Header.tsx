import type { ReactNode } from 'react';
import { Component } from 'react';
import { Search } from '@/components/search/Search.tsx';
import { ErrorButton } from '@/components/error-button/ErrorButton.tsx';
import type { IHeaderProps } from './types.ts';

import styles from './styles.module.scss';

export class Header extends Component<IHeaderProps> {
  public render(): ReactNode {
    const { onSearchChange } = this.props;

    return (
      <header className={styles.header}>
        <ErrorButton />
        <div className={styles.container} />
        <Search onSearchChange={onSearchChange} />
      </header>
    );
  }
}
