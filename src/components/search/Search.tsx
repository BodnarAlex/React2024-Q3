import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import type { SearchProps, SearchState } from './types.ts';

import styles from './styles.module.scss';

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchValue: '' };
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
  };

  private handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const { searchValue } = this.state;
    const { onSearchChange } = this.props;
    onSearchChange(searchValue);
  };

  public render(): ReactNode {
    return (
      <form className={styles.search_box} onSubmit={this.handleSubmit}>
        <input className={styles.search} type="text" placeholder="Search..." onChange={this.handleInputChange} />
        <button type="submit" className={styles.search_button} aria-label="Search-button" />
      </form>
    );
  }
}
