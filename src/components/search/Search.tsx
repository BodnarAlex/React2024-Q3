import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import type { ISearchProps, ISearchState } from './types.ts';

import styles from './styles.module.scss';

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { searchValue: localStorage.getItem('searchString') || '' };
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
  };

  private handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const { searchValue } = this.state;
    const { onSearchChange } = this.props;
    localStorage.setItem('searchString', searchValue);
    onSearchChange(searchValue);
  };

  public render(): ReactNode {
    const { searchValue } = this.state;

    return (
      <form className={styles.search_box} onSubmit={this.handleSubmit}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={this.handleInputChange}
        />
        <button type="submit" className={styles.search_button} aria-label="Search-button" />
      </form>
    );
  }
}
