import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Header } from '../../components/header/Header';
import { CardList } from '../../components/card-list/CardList.tsx';
import { Footer } from '../../components/footer/Footer.tsx';

export function MainPage(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (value: string): void => {
    setSearchParams({ search: value });
  };

  const searchValue = searchParams.get('search') || '';

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <CardList searchValue={searchValue} />
      <Footer />
    </>
  );
}
