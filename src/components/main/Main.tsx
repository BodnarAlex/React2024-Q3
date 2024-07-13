import { type ReactNode, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import type { IPeopleResponse } from '../../api/types.ts';
import { fetchData } from '../../api/api.ts';
import { Loader } from '../loader/Loader.tsx';
import type { IMainProps } from './types.ts';

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
      {peoples.map((people) => (
        <div key={people.created} className={styles.card}>
          <h3 className={styles.name}>{people.name}</h3>
          <p className={styles.paragraph}>
            birth_year: <span className={styles.detail}>{people.birth_year}</span>
          </p>
          <p className={styles.paragraph}>
            gender: <span className={styles.detail}>{people.gender}</span>
          </p>
          <p className={styles.paragraph}>
            mass: <span className={styles.detail}>{people.mass}</span>
          </p>
          <p className={styles.paragraph}>
            height: <span className={styles.detail}>{people.height}</span>
          </p>
          <p className={styles.paragraph}>
            birth_year: <span className={styles.detail}>{people.birth_year}</span>
          </p>
          <p className={styles.paragraph}>
            hair_color: <span className={styles.detail}>{people.hair_color}</span>
          </p>
          <p className={styles.paragraph}>
            eye_color: <span className={styles.detail}>{people.eye_color}</span>
          </p>
          <p className={styles.paragraph}>
            skin_color: <span className={styles.detail}>{people.skin_color}</span>
          </p>
        </div>
      ))}
    </main>
  );
}
