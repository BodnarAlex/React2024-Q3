import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class Footer extends Component {
  public render(): ReactNode {
    return <footer className={styles.footer}>by Alex</footer>;
  }
}
