import { render } from '@testing-library/react';
import { MiniLoader } from '../components/mini-loader/MiniLoader.tsx';
import styles from '../components/mini-loader/styles.module.scss';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
  it('renders main element with correct class', () => {
    const { container } = render(<MiniLoader />);
    const weaponElement = container.querySelector(`.${styles.mini}`);
    expect(weaponElement).toBeInTheDocument();
  });

  it('renders the weapon class correctly', () => {
    const { container } = render(<MiniLoader />);
    const weaponElement = container.querySelector(`.${styles.weapon}`);
    expect(weaponElement).toBeInTheDocument();
  });
});
