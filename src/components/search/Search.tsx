import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

export class Search extends Component {
  public render(): ReactNode {
    return (
      <div className={styles.search_box}>
        <input className={styles.search} type="text" placeholder="Search..." />
        <button type="submit" className={styles.search_button} aria-label="Search-button" />
      </div>
    );
  }
}
