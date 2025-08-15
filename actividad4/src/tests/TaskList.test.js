import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

test('TaskList renders empty state correctly', () => {
  const mockFunctions = {
    onToggleTask: jest.fn(),
    onClearCompleted: jest.fn(),
    onDeleteAll: jest.fn()
  };
  
  render(<TaskList tasks={[]} {...mockFunctions} />);
  
  // El texto completo correcto según tu componente
  expect(screen.getByText('No hay tareas disponibles')).toBeInTheDocument();
});

test('TaskList renders tasks correctly', () => {
  const mockTasks = [
    {
      id: 1,
      title: 'Tarea de prueba',
      completed: false,
      priority: 'alta'
    },
    {
      id: 2,
      title: 'Segunda tarea',
      completed: true,
      priority: 'media'
    }
  ];

  const mockFunctions = {
    onToggleTask: jest.fn(),
    onClearCompleted: jest.fn(),
    onDeleteAll: jest.fn()
  };
  
  render(<TaskList tasks={mockTasks} {...mockFunctions} />);
  
  expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  expect(screen.getByText('Segunda tarea')).toBeInTheDocument();
});

test('TaskList shows correct task counts', () => {
  const mockTasks = [
    { id: 1, title: 'Tarea 1', completed: false, priority: 'alta' },
    { id: 2, title: 'Tarea 2', completed: true, priority: 'media' }
  ];

  const mockFunctions = {
    onToggleTask: jest.fn(),
    onClearCompleted: jest.fn(),
    onDeleteAll: jest.fn()
  };
  
  render(<TaskList tasks={mockTasks} {...mockFunctions} />);
  
  // Verificar que muestra el total correcto
  expect(screen.getByText('Todas (2)')).toBeInTheDocument();
  expect(screen.getByText('Pendientes (1)')).toBeInTheDocument();
  expect(screen.getByText('Completadas (1)')).toBeInTheDocument();
});