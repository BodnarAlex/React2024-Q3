import { type ReactNode, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import type { IPeopleResponse } from '../../api/types.ts';
import { fetchData } from '../../api/api.ts';
import { Card } from '../card/Card.tsx';
import { Loader } from '../loader/Loader.tsx';
import type { IMainProps } from './types.ts';
import { Pagination } from '../pagination/Pagination.tsx';

export function Main({ searchValue }: IMainProps): ReactNode {
  const [peoples, setPeoples] = useState<IPeopleResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const localSearch = localStorage.getItem('searchString') || '';
    const query = searchValue || localSearch;
    const fetchUpdatedData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchData(query, 10);
        setPeoples(response.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUpdatedData();
  }, [searchValue]);

  if (isLoading) {
    return <Loader />;
  }

  if (peoples.length === 0) {
    return <h1 className={styles.name}>Nothing found</h1>;
  }

  return (
    <main className="main">
      <div className={styles.cardList}>
        {peoples.map((people) => (
          <Card key={people.created} person={people} />
        ))}
      </div>
      <Pagination numberPage={1} maxPage={50} />
    </main>
  );
}
