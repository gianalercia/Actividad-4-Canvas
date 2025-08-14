import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../src/components/TaskList';

describe('TaskList Component', () => {
  const mockTasks = [
    {
      id: 1,
      title: 'Tarea de prueba 1',
      completed: false,
      priority: 'alta'
    },
    {
      id: 2,
      title: 'Tarea de prueba 2',
      completed: true,
      priority: 'baja'
    }
  ];

  const mockOnToggleTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  beforeEach(() => {
    mockOnToggleTask.mockClear();
    mockOnDeleteTask.mockClear();
  });

  test('renders empty state when no tasks', () => {
    render(
      <TaskList 
        tasks={[]} 
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );
    
    expect(screen.getByText('No hay tareas disponibles')).toBeInTheDocument();
  });

  test('renders tasks correctly', () => {
    render(
      <TaskList 
        tasks={mockTasks}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );
    
    expect(screen.getByText('Tarea de prueba 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea de prueba 2')).toBeInTheDocument();
    expect(screen.getByText('alta')).toBeInTheDocument();
    expect(screen.getByText('baja')).toBeInTheDocument();
  });

  test('calls onToggleTask when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TaskList 
        tasks={mockTasks}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    expect(mockOnToggleTask).toHaveBeenCalledWith(1);
  });

  test('shows completed task with line-through style', () => {
    render(
      <TaskList 
        tasks={mockTasks}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );
    
    const completedTask = screen.getByText('Tarea de prueba 2');
    expect(completedTask).toHaveClass('line-through');
  });

  test('calls onDeleteTask when delete button is clicked and confirmed', async () => {
    window.confirm = jest.fn(() => true);
    const user = userEvent.setup();
    
    render(
      <TaskList 
        tasks={mockTasks}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );
    
    const deleteButtons = screen.getAllByText('Eliminar');
    await user.click(deleteButtons[0]);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDeleteTask).toHaveBeenCalledWith(1);
  });
});