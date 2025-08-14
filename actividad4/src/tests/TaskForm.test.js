import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../src/components/TaskForm';

describe('TaskForm Component', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    expect(screen.getByPlaceholderText('Escribe tu tarea aquí...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Prioridad Media')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar tarea/i })).toBeInTheDocument();
  });

  test('handles input change correctly', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByPlaceholderText('Escribe tu tarea aquí...');
    await user.type(input, 'Nueva tarea de prueba');
    
    expect(input).toHaveValue('Nueva tarea de prueba');
  });

  test('calls onAddTask when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByPlaceholderText('Escribe tu tarea aquí...');
    const button = screen.getByRole('button', { name: /agregar tarea/i });
    
    await user.type(input, 'Test task');
    await user.click(button);
    
    expect(mockOnAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test task',
        priority: 'media',
        completed: false
      })
    );
  });

  test('shows alert when trying to submit empty task', async () => {
    window.alert = jest.fn();
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const button = screen.getByRole('button', { name: /agregar tarea/i });
    await user.click(button);
    
    expect(window.alert).toHaveBeenCalledWith('La tarea no puede estar vacía');
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  test('changes priority correctly', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const select = screen.getByDisplayValue('Prioridad Media');
    await user.selectOptions(select, 'alta');
    
    expect(select).toHaveValue('alta');
  });
});