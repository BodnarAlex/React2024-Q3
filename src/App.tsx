import './App.css';
import type { ReactNode } from 'react';
import { Component } from 'react';

import { Header } from '@/components/header/Header';
import { Main } from '@/components/main/Main';
import { Footer } from '@/components/footer/Footer.tsx';

export class App extends Component {
  public render(): ReactNode {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
