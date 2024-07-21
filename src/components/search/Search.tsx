import { useState } from 'react';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

import styles from './styles.module.scss';

export function Search(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useLocalStorage(
    searchParams.get('search') || '',
  );
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSearchValue(inputValue);
    setSearchParams({ page: '1', search: inputValue });
  };

  return (
    <div className={styles.search_wrapper}>
      <form className={styles.search_box} onSubmit={handleSubmit}>
        <input
          className={styles.search}
          type='text'
          placeholder='Search...'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className={styles.search_button}
          aria-label='Search-button'
        />
      </form>
    </div>
  );
}
