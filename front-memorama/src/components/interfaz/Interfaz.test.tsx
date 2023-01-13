import React from 'react';
import { render, screen } from '@testing-library/react';
import Interfaz from './Interfaz';

test('renders learn react link', () => {
  render(<Interfaz setNivel={() => { }} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
