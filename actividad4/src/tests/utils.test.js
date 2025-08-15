import { getPriorityColor, validateTask, formatTaskForAPI } from '../utils/helpers';

test('getPriorityColor returns correct classes', () => {
  expect(getPriorityColor('alta')).toBe('border-l-red-500 bg-red-50');
  expect(getPriorityColor('media')).toBe('border-l-yellow-500 bg-yellow-50');
  expect(getPriorityColor('baja')).toBe('border-l-green-500 bg-green-50');
  expect(getPriorityColor('inexistente')).toBe('border-l-gray-500 bg-gray-50');
});

test('validateTask validates correctly', () => {
  // Para casos válidos debe retornar truthy (el length > 0)
  expect(validateTask('Tarea válida')).toBeTruthy();
  expect(validateTask('Otra tarea')).toBeTruthy();
  
  // Para casos inválidos debe retornar falsy
  expect(validateTask('')).toBeFalsy();
  expect(validateTask('   ')).toBeFalsy();
  expect(validateTask(null)).toBeFalsy();
  expect(validateTask(undefined)).toBeFalsy();
});

test('formatTaskForAPI adds userId', () => {
  const task = { id: 1, title: 'Test task' };
  const formatted = formatTaskForAPI(task);
  
  expect(formatted).toEqual({
    id: 1,
    title: 'Test task',
    userId: 1
  });
});