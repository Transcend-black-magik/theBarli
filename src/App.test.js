import { render, screen } from '@testing-library/react';
import App from './App';

test('renders The Barli residence page', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /a quieter way to stay/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
});
