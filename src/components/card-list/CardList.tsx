import type { ReactNode } from 'react';
import {
  useLocation,
  useSearchParams,
  Outlet,
  Link,
  useNavigate,
} from 'react-router-dom';
import { NotFound } from '@/pages/not-found/NotFound';
import styles from './styles.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Card } from '../card/Card';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { useFetchPeopleQuery } from '../../services/api.ts';

export function CardList(): ReactNode {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const handleCardClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    event.stopPropagation();
    setSearchParams({ page: String(currentPage), search: searchQuery });
  };

  const handleCloseButtonClick: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
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

  if (error) {
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
      <div className={styles.commonBlock} onClick={handleCloseButtonClick}>
        <div className={styles.cardList}>
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
