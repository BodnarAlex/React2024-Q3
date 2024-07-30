import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../contexts/ThemeContext';
import store from '../store/index.ts';
import { App } from '../App.tsx';

describe('Root App Rendering', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the App component', () => {
    expect(
      screen.getByRole('button', { name: /to Light Mode/i }),
    ).toBeInTheDocument();
  });
});
