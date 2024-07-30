import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Pagination } from '../components/pagination/Pagination.tsx';
import store from '../store/index.ts';

type NavigateFn = (to: string) => void;
const mockNavigate: NavigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: (): NavigateFn => mockNavigate,
  };
});

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

  it('should update URL query parameter and state when past button is clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination numberPage={2} maxPage={5} searchValue='o' />
        </BrowserRouter>
      </Provider>,
    );
    const pageButton = screen.getByText('>');
    const user = userEvent.setup();
    await user.click(pageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2&search=o');
  });

  it('should update URL query parameter and state when prevois button is clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination numberPage={2} maxPage={5} searchValue='o' />
        </BrowserRouter>
      </Provider>,
    );
    const pageButton = screen.getByText('<');
    const user = userEvent.setup();
    await user.click(pageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1&search=o');
  });

  it('should update URL query parameter and state when button ... is clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination numberPage={1} maxPage={9} searchValue='o' />
        </BrowserRouter>
      </Provider>,
    );
    const pageButton = screen.getByText('...');
    const user = userEvent.setup();
    await user.click(pageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=5&search=o');
  });
});
