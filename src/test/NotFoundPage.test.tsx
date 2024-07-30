import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index.ts';
import { NotFound } from '../pages/not-found/NotFound.tsx';

describe('MainLayout', () => {
  it('renders all required components', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the main element with correct class', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('main');
  });

  it('displays the correct title text', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );
    const titleElement = screen.getByText('This is');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the 404 error', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );
    const errorElement = screen.getByText('404');
    expect(errorElement).toBeInTheDocument();
  });

  it('has a link to return to the main page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );
    const linkElement = screen.getByText('Return on other side');
    expect(linkElement).toBeInTheDocument();
  });
});
