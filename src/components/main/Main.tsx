import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';
import type { MainState } from '../../api/types.ts';
import { fetchData } from '../../api/api.ts';

export class Main extends Component<Record<string, never>, MainState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      peoples: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const response = await fetchData('', 10);
      this.setState({ peoples: response.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  public render(): ReactNode {
    const { peoples } = this.state;

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
