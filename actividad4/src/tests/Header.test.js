import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header Component', () => {
  test('renders title and task count correctly', () => {
    const mockProps = {
      title: 'Test App',
      taskCount: 5
    };

    render(<Header {...mockProps} />);
    
    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('Total de tareas: 5')).toBeInTheDocument();
  });

  test('displays zero tasks correctly', () => {
    render(<Header title="Todo App" taskCount={0} />);
    
    expect(screen.getByText('Total de tareas: 0')).toBeInTheDocument();
  });
});