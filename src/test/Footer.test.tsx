import { render } from '@testing-library/react';
import { Footer } from '../components/footer/Footer.tsx';
import styles from '../components/footer/styles.module.scss';

import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('renders the footer text correctly', () => {
    const { getByText } = render(<Footer />);
    const footerElement = getByText(/by Alex/i);
    expect(footerElement).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector(`.${styles.footer}`);
    expect(footerElement).toBeVisible();
  });
});
