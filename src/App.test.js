import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i); // Use queryByText instead of getByText
  expect(linkElement).toBeInTheDocument(); // Add this line to expect the linkElement to be in the document
});
