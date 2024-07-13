import { type ReactNode, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import type { ICardProps } from './types.ts';

export function Pagination({ numberPage, maxPage }: ICardProps): ReactNode {
  const [currentPage, setCurrentPage] = useState(numberPage);
  const pages: ReactNode[] = [];
  const numAdjacentPages = 1;

  for (let i = Math.max(1, currentPage - numAdjacentPages); i < currentPage; i += 1) {
    pages.push(
      <div key={i} className={styles.blockPage} onClick={() => setCurrentPage(i)}>
        {i}
      </div>,
    );
  }

  pages.push(
    <div key={currentPage} className={classNames(styles.blockPage, styles.active)}>
      {currentPage}
    </div>,
  );

  for (let i = currentPage + 1; i <= Math.min(maxPage, currentPage + numAdjacentPages); i += 1) {
    pages.push(
      <div key={i} className={styles.blockPage} onClick={() => setCurrentPage(i)}>
        {i}
      </div>,
    );
  }

  if (currentPage > numAdjacentPages + 1) {
    pages.unshift(
      <div key="first" className={styles.blockPage} onClick={() => setCurrentPage(1)}>
        1
      </div>,
    );
    if (currentPage > numAdjacentPages + 2) {
      const toPage = Math.floor((currentPage + 1) / 2);
      pages.splice(
        1,
        0,
        <div key="left" className={styles.blockPage} onClick={() => setCurrentPage(toPage)}>
          ...
        </div>,
      );
    }
  }

  if (currentPage < maxPage - numAdjacentPages) {
    const toPage = Math.floor((currentPage + maxPage) / 2);
    if (currentPage < maxPage - numAdjacentPages - 1) {
      pages.push(
        <div key="right" className={styles.blockPage} onClick={() => setCurrentPage(toPage)}>
          ...
        </div>,
      );
    }
    pages.push(
      <div key="last" className={styles.blockPage} onClick={() => setCurrentPage(maxPage)}>
        {maxPage}
      </div>,
    );
  }

  const handlePreviousClick = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < maxPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.blockPage, { [styles.disabled as string]: currentPage === 1 })}
        onClick={handlePreviousClick}
      >
        &#60;
      </div>
      {pages}
      <div
        className={classNames(styles.blockPage, { [styles.disabled as string]: currentPage === maxPage })}
        onClick={handleNextClick}
      >
        &#62;
      </div>
    </div>
  );
}
