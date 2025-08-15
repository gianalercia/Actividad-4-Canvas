import { getPriorityColor } from './utils/helpers';

test('getPriorityColor transforms priority to correct color', () => {
  expect(getPriorityColor('alta')).toBe('border-l-red-500 bg-red-50');
  expect(getPriorityColor('media')).toBe('border-l-yellow-500 bg-yellow-50');
  expect(getPriorityColor('baja')).toBe('border-l-green-500 bg-green-50');
});