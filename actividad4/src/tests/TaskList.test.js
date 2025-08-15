import { render, screen } from '@testing-library/react';
import TaskList from './components/TaskList';

test('TaskList renders empty state correctly', () => {
  const mockFunctions = {
    onToggleTask: jest.fn(),
    onClearCompleted: jest.fn(),
    onDeleteAll: jest.fn()
  };
  
  render(<TaskList tasks={[]} {...mockFunctions} />);
  
  expect(screen.getByText('No hay tareas disponibles')).toBeInTheDocument();
});