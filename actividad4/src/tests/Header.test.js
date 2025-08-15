import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('Header renders title correctly', () => {
  render(<Header title="Mi Aplicación" />);
  expect(screen.getByText('Mi Aplicación')).toBeInTheDocument();
});

test('Header renders author name', () => {
  render(<Header title="Test Title" />);
  expect(screen.getByText('Actividad 4 - Gian Luca Alercia')).toBeInTheDocument();
});