import { render, screen } from '@testing-library/ui';
import App from './App';

test('renders learn ui link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
