import { render } from '@testing-library/react';
import { ErrorPage } from '../pages/error-page/ErrorPage.tsx';
import styles from '../pages/error-page/styles.module.scss';

describe('ErrorPage component', () => {
  it('should render with error message and handle reset button click', () => {
    const mockErrorMessage = 'Page not found';
    render(<ErrorPage errorMessage={mockErrorMessage} onReset={() => {}} />);

    expect(document.querySelector(`.${styles.title}`)?.textContent).toBe(
      'This is error!',
    );

    expect(document.querySelector(`.${styles.detail}`)?.textContent).toBe(
      mockErrorMessage,
    );
  });

  it('should render without error message if none provided', () => {
    render(<ErrorPage errorMessage='' onReset={() => {}} />);

    expect(document.querySelector('.error')).toBeNull();
  });
});
