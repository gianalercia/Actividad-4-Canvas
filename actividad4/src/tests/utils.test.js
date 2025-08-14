import { getPriorityColor, formatTaskForAPI } from '../src/utils/helpers';

describe('Utility Functions', () => {
  describe('getPriorityColor', () => {
    test('returns correct color for high priority', () => {
      expect(getPriorityColor('alta')).toBe('border-l-red-500 bg-red-50');
    });

    test('returns correct color for medium priority', () => {
      expect(getPriorityColor('media')).toBe('border-l-yellow-500 bg-yellow-50');
    });

    test('returns correct color for low priority', () => {
      expect(getPriorityColor('baja')).toBe('border-l-green-500 bg-green-50');
    });

    test('returns default color for unknown priority', () => {
      expect(getPriorityColor('desconocida')).toBe('border-l-gray-500 bg-gray-50');
    });
  });

  describe('formatTaskForAPI', () => {
    test('formats task object correctly', () => {
      const task = {
        id: 1,
        title: 'Test task',
        completed: false,
        priority: 'alta'
      };

      const formatted = formatTaskForAPI(task);
      
      expect(formatted).toEqual({
        id: 1,
        title: 'Test task',
        completed: false,
        priority: 'alta',
        userId: 1
      });
    });

    test('handles missing properties gracefully', () => {
      const task = {
        title: 'Incomplete task'
      };

      const formatted = formatTaskForAPI(task);
      
      expect(formatted).toHaveProperty('userId', 1);
      expect(formatted).toHaveProperty('title', 'Incomplete task');
    });
  });
});