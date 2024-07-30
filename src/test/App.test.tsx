import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../contexts/ThemeContext';
import store from '../store/index.ts';
import { App } from '../App';

test('should have hello world', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
  );
  expect(
    screen.getByRole('button', { name: /to Light Mode/i }),
  ).toBeInTheDocument();
});
