import type { ReactNode } from 'react';
import { Component } from 'react';

import { Header } from '../../components/header/Header';
import { Main } from '../../components/main/Main';
import { Footer } from '../../components/footer/Footer.tsx';
import type { MainPageProps, MainPageState } from './type.ts';

export class MainPage extends Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  private handleSearchChange = (value: string): void => {
    this.setState({ searchValue: value });
  };

  public render(): ReactNode {
    const { searchValue } = this.state;

    return (
      <>
        <Header onSearchChange={this.handleSearchChange} />
        <Main searchValue={searchValue} />
        <Footer />
      </>
    );
  }
}
