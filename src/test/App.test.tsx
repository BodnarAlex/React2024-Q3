import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../App'; // Adjust the import path based on your project structure

test('should have hello world', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeDefined();
});
