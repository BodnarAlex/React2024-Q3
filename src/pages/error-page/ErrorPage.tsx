import type { ReactNode } from 'react';
import { Component } from 'react';
import type { Props } from './types.ts';

import styles from './styles.module.scss';

export class ErrorPage extends Component<Props> {
  public render(): ReactNode {
    const { errorMessage, onReset } = this.props;

    return (
      <main className={styles.main}>
        <h1 className={styles.header}>This is error!</h1>
        <div className={styles.stormtrooper} />
        {errorMessage && (
          <div className={styles.error}>
            Error message: <span className={styles.detail}>{errorMessage}</span>
          </div>
        )}
        <button className={styles.refreshBtn} type="button" onClick={onReset}>
          Return on other side
        </button>
      </main>
    );
  }
}
