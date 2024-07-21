import type { MouseEventHandler, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import {
  useLocation,
  useSearchParams,
  Outlet,
  Link,
  useNavigate,
} from 'react-router-dom';
import { NotFound } from '@/pages/not-found/NotFound.tsx';
import styles from './styles.module.scss';
import type { IPeopleResponse } from '../../api/types.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { fetchData } from '../../api/api.ts';
import { Card } from '../card/Card.tsx';
import { Loader } from '../loader/Loader.tsx';
import { Pagination } from '../pagination/Pagination.tsx';

export function CardList(): ReactNode {
  const [peoples, setPeoples] = useState<IPeopleResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [statistic, setStatistic] = useState<string>('0 / 0');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = useLocation();
  const cardsOnPage = 10;
  const activeId = location.pathname.split('/').pop() || '';
  const currentPage: number =
    Number(new URLSearchParams(location.search).get('page')) || 1;

  const [searchQuery] = useLocalStorage('');
  const searchValue = searchParams.get('search') || searchQuery;

  const extractIdFromUrl = (url: string): string => {
    const idMatch = url.split('/');
    return idMatch.at(5) || '0';
  };

  useEffect(() => {
    const query = searchValue;
    const fetchUpdatedData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchData(query, currentPage);
        const updatedResults = response.results.map(
          (item: IPeopleResponse) => ({
            ...item,
            id: extractIdFromUrl(item.url),
          }),
        );
        setMaxPage(Math.ceil(response.count / cardsOnPage));
        setStatistic(`${updatedResults.length} / ${response.count}`);
        setPeoples(updatedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUpdatedData();
  }, [searchQuery, currentPage, searchValue]);

  const handleCardClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.stopPropagation();
    setSearchParams({ page: String(currentPage), search: searchQuery });
  };

  const handleCloseButtonClick: MouseEventHandler<HTMLDivElement> = () => {
    if (location.pathname.includes('/details/')) {
      const params = new URLSearchParams(location.search);
      navigate({
        pathname: '/',
        search: params.toString(),
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!peoples) {
    return <NotFound />;
  }

  if (peoples.length === 0) {
    return (
      <main className='main'>
        <h1 className={styles.name}>Nothing found</h1>
      </main>
    );
  }

  return (
    <main className='main'>
      <p className={styles.itemInfo}>{statistic}</p>
      <div className={styles.commonBlock}>
        <div className={styles.cardList} onClick={handleCloseButtonClick}>
          {peoples.map((people) => (
            <Link
              key={people.created}
              onClick={handleCardClick}
              to={`/details/${people.id}`}
            >
              <Card person={people} isActive={people.id === activeId} />
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
      {peoples && (
        <Pagination
          numberPage={currentPage}
          maxPage={maxPage}
          searchValue={searchQuery}
        />
      )}
    </main>
  );
}
