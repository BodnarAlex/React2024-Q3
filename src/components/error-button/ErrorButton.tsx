import { type ReactNode, useState } from "react";
import styles from "./styles.module.scss";

export function ErrorButton(): ReactNode {
  const [isError, setIsError] = useState(false);

  const handleClick = (): void => {
    setIsError(true);
  };

  if (isError) {
    throw new Error("Throw error by button");
  }

  return (
    <div className={styles.containerButton}>
      <button className={styles.button} onClick={handleClick}>
        Error
      </button>
    </div>
  );
}
