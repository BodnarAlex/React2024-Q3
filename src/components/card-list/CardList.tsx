import { type ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NotFound } from '@/pages/not-found/NotFound.tsx';
import styles from './styles.module.scss';
import type { IPeopleResponse } from '../../api/types.ts';

import { fetchData } from '../../api/api.ts';
import { Card } from '../card/Card.tsx';
import { Loader } from '../loader/Loader.tsx';
import type { IMainProps } from './types.ts';
import { Pagination } from '../pagination/Pagination.tsx';

export function CardList({ searchValue }: IMainProps): ReactNode {
  const [peoples, setPeoples] = useState<IPeopleResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [statistic, setStatistic] = useState<string>('0 / 0');

  const location = useLocation();
  const cardsOnPage = 10;
  const currentPage: number = Number(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    const localSearch = localStorage.getItem('searchString') || '';
    const query = searchValue || localSearch;
    const fetchUpdatedData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchData(query, currentPage);
        setMaxPage(Math.ceil(response.count / cardsOnPage));
        setStatistic(`${response.results.length} / ${response.count}`);
        setPeoples(response.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUpdatedData();
  }, [searchValue, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!peoples) {
    return <NotFound />;
  }

  if (peoples.length === 0) {
    return <h1 className={styles.name}>Nothing found</h1>;
  }

  return (
    <main className="main">
      <p className={styles.itemInfo}>{statistic}</p>
      <div className={styles.commonBlock}>
        <div className={styles.cardList}>
          {peoples.map((people) => (
            <Card key={people.created} person={people} />
          ))}
        </div>
      </div>

      <Pagination numberPage={currentPage} maxPage={maxPage} searchValue={searchValue} />
    </main>
  );
}
