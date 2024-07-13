import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import type { ISearchProps } from './types.ts';

import styles from './styles.module.scss';

export function Search({ onSearchChange }: ISearchProps): ReactNode {
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchString') || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    localStorage.setItem('searchString', searchValue);
    onSearchChange(searchValue);
  };

  return (
    <form className={styles.search_box} onSubmit={handleSubmit}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.search_button} aria-label="Search-button" />
    </form>
  );
}
