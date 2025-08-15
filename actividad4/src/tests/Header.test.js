import { render, screen } from '@testing-library/react';
import Header from './components/Header';

test('Header renders title correctly', () => {
  render(<Header title="Mi Aplicación" />);
  expect(screen.getByText('Mi Aplicación')).toBeInTheDocument();
});