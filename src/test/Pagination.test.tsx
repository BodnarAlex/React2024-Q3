import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '../components/pagination/Pagination.tsx';

const mockProps = {
  numberPage: 1,
  maxPage: 5,
  searchValue: 'o',
};

describe('Pagination component', () => {
  it('should update URL query parameter when page changes', async () => {
    render(
      <MemoryRouter initialEntries={['/?search=o&page=1']}>
        <Pagination
          numberPage={mockProps.numberPage}
          maxPage={mockProps.maxPage}
          searchValue={mockProps.searchValue}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('1')).toBeVisible();

    fireEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(screen.getByText('2')).toBeVisible();
    });
  });
});
