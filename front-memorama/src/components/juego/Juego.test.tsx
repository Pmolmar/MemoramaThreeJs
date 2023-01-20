import React from 'react';
import { render, screen } from '@testing-library/react';
import Juego from './Juego';
import { Niveles } from '../../types/niveles';

test('renders learn react link', () => {
  render(<Juego nivel={Niveles[0]} fin={false} actualizaFin={""} actualizaPuntos={""} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
