import React from 'react';
import { render, screen } from '@testing-library/react';
import Puntuacion from './Puntuacion';

test('renders learn react link', () => {
  render(<Puntuacion puntuacion={0}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
