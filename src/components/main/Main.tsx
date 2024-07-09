import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';
import type { IMainState } from '../../api/types.ts';
import { fetchData } from '../../api/api.ts';
import { Loader } from '../loader/Loader.tsx';
import type { IMainProps } from './types.ts';

export class Main extends Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      peoples: [],
      isLoading: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    const localSearch = localStorage.getItem('searchString') || '';
    try {
      this.setState({ isLoading: true });
      const response = await fetchData(localSearch, 10);
      this.setState({ peoples: response.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  public async componentDidUpdate(prevProps: IMainProps): Promise<void> {
    const { searchValue } = this.props;
    if (prevProps.searchValue !== searchValue) {
      try {
        this.setState({ isLoading: true });
        const response = await fetchData(searchValue, 10);
        this.setState({ peoples: response.results });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  public render(): ReactNode {
    const { peoples, isLoading } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (peoples.length === 0) {
      return <h1 className={styles.name}>Nothing found</h1>;
    }

    return (
      <main className={styles.main}>
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
}
