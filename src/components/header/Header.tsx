import type { ReactNode } from 'react';
import { Component } from 'react';
import { Search } from '@/components/search/Search.tsx';
import { ErrorButton } from '@/components/error-button/ErrorButton.tsx';

import styles from './styles.module.scss';

interface HeaderProps {
  onSearchChange: (value: string) => void;
}

export class Header extends Component<HeaderProps> {
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
