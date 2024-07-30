import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Pagination } from '../components/pagination/Pagination.tsx';
import store from '../store/index.ts';

describe('Pagination component', () => {
  it('renders all required components', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination numberPage={1} maxPage={9} searchValue='o' />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('renders all required components', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination numberPage={1} maxPage={1} searchValue='o' />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});
