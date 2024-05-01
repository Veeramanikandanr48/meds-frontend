import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Home/i); // Use getAllByText instead
  expect(linkElements.length).toBeGreaterThan(0); // Ensure at least one matching element is found
});
