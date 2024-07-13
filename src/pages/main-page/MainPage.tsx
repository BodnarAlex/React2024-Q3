import { type ReactNode, useState } from 'react';

import { Header } from '../../components/header/Header';
import { Main } from '../../components/main/Main';
import { Footer } from '../../components/footer/Footer.tsx';

export function MainPage(): ReactNode {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <Main searchValue={searchValue} />
      <Footer />
    </>
  );
}
