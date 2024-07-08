import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';

interface IAllResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IPeopleResponse[];
}

interface IPeopleResponse {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface MainState {
  peoples: IPeopleResponse[];
}

async function fetchData(searchText: string, perPage: number): Promise<IAllResponse> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchText}&limit=${perPage}&page=1`);
  return (await response.json()) as Promise<IAllResponse>;
}

export class Main extends Component<Record<string, never>, MainState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      peoples: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const response = await fetchData('ob', 10);
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
            <h3>{people.name}</h3>
            <p>birth_year: {people.birth_year}</p>
            <p>gender: {people.gender}</p>
            <p>mass: {people.mass}</p>
            <p>height: {people.height}</p>
            <p>birth_year: {people.birth_year}</p>
            <p>hair_color: {people.hair_color}</p>
            <p>eye_color: {people.eye_color}</p>
            <p>skin_color: {people.skin_color}</p>
          </div>
        ))}
      </main>
    );
  }
}
