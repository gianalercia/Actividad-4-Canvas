import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch para evitar llamadas reales a la API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, title: 'Test task', completed: false, userId: 1 }
    ]),
  })
);

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders app title after loading', async () => {
    render(<App />);
    
    // Verificar que eventualmente aparece el título
    await waitFor(() => {
      expect(screen.getByText('Gestor de Tareas React')).toBeInTheDocument();
    });
  });

  test('shows loading state initially', () => {
    render(<App />);
    
    expect(screen.getByText('Cargando tareas...')).toBeInTheDocument();
  });

  test('renders task form after loading', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Agregar Nueva Tarea')).toBeInTheDocument();
    });
  });
});