import { type ReactNode } from 'react';
import { Search } from '@/components/search/Search.tsx';
import { Header } from '../../components/header/Header';
import { CardList } from '../../components/card-list/CardList.tsx';
import { Footer } from '../../components/footer/Footer.tsx';

export function MainPage(): ReactNode {
  return (
    <>
      <Header />
      <Search />
      <CardList />
      <Footer />
    </>
  );
}
