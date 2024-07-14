import type { ReactNode } from "react";
import type { Props } from "./types.ts";
import styles from "./styles.module.scss";

export function ErrorPage({ errorMessage, onReset }: Props): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}>This is error!</h1>
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
