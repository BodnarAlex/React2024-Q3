import { type ReactNode, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { setPage } from '../../store/paginationSlice';
import type { RootState } from '../../store';
import type { IPaginationProps } from './types';

export function Pagination({
  numberPage,
  maxPage,
  searchValue,
}: IPaginationProps): ReactNode {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentPage =
    useSelector((state: RootState) => state.pagination.currentPage) ||
    numberPage;
  const pages: ReactNode[] = [];
  const numAdjacentPages = 1;

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: currentPage.toString(), search: searchValue });
    }
  }, [currentPage, searchParams, setSearchParams, searchValue]);

  const updatePage = (page: number): void => {
    dispatch(setPage(page));
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  const createPageLink = (
    page: number,
    active = false,
    notDefault: string | undefined = undefined,
  ): ReactNode => (
    <div
      key={page}
      onClick={() => updatePage(page)}
      className={classNames(styles.blockPage, {
        [styles.active as string]: active,
      })}
    >
      {notDefault || page}
    </div>
  );

  for (
    let i = Math.max(1, currentPage - numAdjacentPages);
    i < currentPage;
    i += 1
  ) {
    pages.push(createPageLink(i));
  }

  pages.push(createPageLink(currentPage, true));

  for (
    let i = currentPage + 1;
    i <= Math.min(maxPage, currentPage + numAdjacentPages);
    i += 1
  ) {
    pages.push(createPageLink(i));
  }

  if (currentPage > numAdjacentPages + 1) {
    pages.unshift(createPageLink(1));

    if (currentPage > numAdjacentPages + 2) {
      const toPage = Math.floor((currentPage + 1) / 2);
      pages.splice(1, 0, createPageLink(toPage, false, '...'));
    }
  }

  if (currentPage < maxPage - numAdjacentPages) {
    const toPage = Math.floor((currentPage + maxPage) / 2);
    if (currentPage < maxPage - numAdjacentPages - 1) {
      pages.push(createPageLink(toPage, false, '...'));
    }
    pages.push(createPageLink(maxPage));
  }

  const handlePreviousClick = (): void => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < maxPage) {
      updatePage(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.blockPage, {
          [styles.disabled as string]: currentPage === 1,
        })}
        onClick={handlePreviousClick}
      >
        &#60;
      </div>
      {pages}
      <div
        className={classNames(styles.blockPage, {
          [styles.disabled as string]: currentPage === maxPage,
        })}
        onClick={handleNextClick}
      >
        &#62;
      </div>
    </div>
  );
}
