import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFound } from '../components/not-found/NotFound.tsx';

describe('NotFound component', () => {
  it('renders correctly', () => {
    render(<NotFound />);

    const headingElement = screen.getByText('Nothing found');
    expect(headingElement).toBeInTheDocument();
  });
});
