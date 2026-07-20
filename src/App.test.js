import { render, screen } from '@testing-library/react';
import App from './App';

test('renders The Barli residence page', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /refined urban living/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /check availability/i })).toBeInTheDocument();
});
