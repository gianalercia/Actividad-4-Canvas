export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'alta': return 'border-l-red-500 bg-red-50';
    case 'media': return 'border-l-yellow-500 bg-yellow-50';
    case 'baja': return 'border-l-green-500 bg-green-50';
    default: return 'border-l-gray-500 bg-gray-50';
  }
};

export const formatTaskForAPI = (task) => {
  return {
    ...task,
    userId: 1
  };
};

export const validateTask = (taskTitle) => {
  return taskTitle && taskTitle.trim().length > 0;
};