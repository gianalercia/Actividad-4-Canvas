import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

test('TaskForm handles button click event', () => {
  const mockAddTask = jest.fn();
  render(<TaskForm onAddTask={mockAddTask} />);
  
  const input = screen.getByPlaceholderText('Escribe tu tarea aquí...');
  const button = screen.getByRole('button', { name: /agregar tarea/i });
  
  fireEvent.change(input, { target: { value: 'Nueva tarea' } });
  fireEvent.click(button);
  
  expect(mockAddTask).toHaveBeenCalled();
  expect(mockAddTask).toHaveBeenCalledWith(
    expect.objectContaining({
      title: 'Nueva tarea',
      priority: 'media',
      completed: false,
      userId: 1
    })
  );
});

test('TaskForm clears input after submission', () => {
  const mockAddTask = jest.fn();
  render(<TaskForm onAddTask={mockAddTask} />);
  
  const input = screen.getByPlaceholderText('Escribe tu tarea aquí...');
  const button = screen.getByRole('button', { name: /agregar tarea/i });
  
  fireEvent.change(input, { target: { value: 'Nueva tarea' } });
  fireEvent.click(button);
  
  expect(input.value).toBe('');
});
