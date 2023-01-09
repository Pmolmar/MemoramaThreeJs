import React from 'react';
import { render, screen } from '@testing-library/react';
import Juego from './Juego';

test('renders learn react link', () => {
  render(<Juego />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
