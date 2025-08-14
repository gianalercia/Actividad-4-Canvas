import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('media');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      alert('La tarea no puede estar vacía');
      return;
    }
    
    const task = {
      id: Date.now(),
      title: newTask,
      priority: priority,
      completed: false,
      userId: 1
    };
    
    onAddTask(task);
    setNewTask('');
    setPriority('media');
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div className="task-form">
      <h2>Agregar Nueva Tarea</h2>
      
      <div className="form-group">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Escribe tu tarea aquí..."
          className="task-input"
        />
      </div>
      
      <div className="form-group">
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="priority-select"
        >
          <option value="baja">Prioridad Baja</option>
          <option value="media">Prioridad Media</option>
          <option value="alta">Prioridad Alta</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="add-button"
      >
        Agregar Tarea
      </button>
    </div>
  );
};

export default TaskForm;