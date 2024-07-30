import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { DetailedCard } from '@/pages/detailed-card/DetailedCard.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index.ts';
import * as api from '../services/api.ts';
import styles from '../components/mini-loader/styles.module.scss';

vi.mock('../services/api.ts', async () => {
  const actual = await vi.importActual<typeof api>('../services/api.ts');
  return {
    ...actual,
    useFetchPersonQuery: vi.fn(),
  };
});

const mockedUseFetchPersonQuery = api.useFetchPersonQuery as jest.Mock;

describe('DetailedCard Component', () => {
  const mockDetails = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
  };

  test('should display character details when fetched successfully', async () => {
    mockedUseFetchPersonQuery.mockReturnValue({
      data: mockDetails,
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailedCard />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Height:/i)).toHaveTextContent('Height: 172');
      expect(screen.getByText(/Mass:/i)).toHaveTextContent('Mass: 77');
      expect(screen.getByText(/Birth Year:/i)).toHaveTextContent(
        'Birth Year: 19BBY',
      );
      expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender: male');
      expect(screen.getByText(/Hair Color:/i)).toHaveTextContent(
        'Hair Color: blond',
      );
      expect(screen.getByText(/Skin Color:/i)).toHaveTextContent(
        'Skin Color: fair',
      );
      expect(screen.getByText(/Eye Color:/i)).toHaveTextContent(
        'Eye Color: blue',
      );
    });
  });

  test('should display error message when fetch fails', async () => {
    mockedUseFetchPersonQuery.mockReturnValue({
      data: null,
      error: new Error('Error fetching details'),
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailedCard />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error fetching person details.'),
      ).toBeInTheDocument();
    });
  });

  test('should display no person found message when no person data is returned', async () => {
    mockedUseFetchPersonQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailedCard />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('No person found.')).toBeInTheDocument();
    });
  });

  test('should display MiniLoader when loading', () => {
    mockedUseFetchPersonQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailedCard />
        </BrowserRouter>
      </Provider>,
    );

    const miniLoader = container.querySelector(`.${styles.mini}`);
    expect(miniLoader).toBeInTheDocument();
  });
});
