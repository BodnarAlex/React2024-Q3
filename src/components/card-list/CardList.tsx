import type { ReactNode } from 'react';
import {
  useLocation,
  useSearchParams,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { NotFound } from '@/pages/not-found/NotFound';
import styles from './styles.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Card } from '../card/Card';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { useFetchPeopleQuery } from '../../services/api.ts';
import { Flyout } from '../flyout/Flyout.tsx';

export function CardList(): ReactNode {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery] = useLocalStorage('');
  const searchValue = searchParams.get('search') || searchQuery;
  const currentPage =
    Number(new URLSearchParams(location.search).get('page')) || 1;
  const cardsOnPage = 10;
  const activeId = location.pathname.split('/').pop() || '';

  const { data, error, isLoading } = useFetchPeopleQuery({
    searchText: searchValue,
    page: currentPage,
  });
  const extractIdFromUrl = (url: string): string => {
    const idMatch = url.split('/');
    return idMatch.at(-2) || '0';
  };

  const peoples =
    data?.results.map((person) => ({
      ...person,
      id: extractIdFromUrl(person.url),
    })) || [];

  const maxPage = Math.ceil((data?.count || 0) / cardsOnPage);
  const statistic = `${peoples.length} / ${data?.count || 0}`;

  const handleCloseButtonClick: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    if (location.pathname.includes('/details/')) {
      const params = new URLSearchParams(location.search);
      navigate(`/?${params.toString()}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <main className='main'>
      <p className={styles.itemInfo}>{statistic}</p>
      <div className={styles.commonBlock} onClick={handleCloseButtonClick}>
        <div className={styles.cardList}>
          {peoples.length === 0 && (
            <h1 className={styles.name}>Nothing found</h1>
          )}
          {peoples &&
            peoples.map((people) => (
              <Card
                key={people.id}
                person={people}
                isActive={people.id === activeId}
              />
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
      <Flyout />
    </main>
  );
}
