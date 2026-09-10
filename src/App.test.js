import { render, screen } from '@testing-library/react';
import App from './App';

test('renders The Barli residence page', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /^your private space\.$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /your private space in abuja/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
});
