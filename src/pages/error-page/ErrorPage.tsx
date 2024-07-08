import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './styles.module.scss';

type Props = {
  errorMessage: string;
};

export class ErrorPage extends Component<Props> {
  private static handleRefresh = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    const { errorMessage } = this.props;

    return (
      <main className={styles.main}>
        <h1 className={styles.header}>This is error!</h1>
        <div className={styles.stormtrooper} />
        {errorMessage && (
          <div className={styles.error}>
            Error message: <span className={styles.detail}>{errorMessage}</span>
          </div>
        )}
        <button className={styles.refreshBtn} type="button" onClick={ErrorPage.handleRefresh}>
          Return on other side
        </button>
      </main>
    );
  }
}
