import React, { useState } from 'react';

const TaskList = ({ tasks, onToggleTask, onClearCompleted, onDeleteAll }) => {
  const [filter, setFilter] = useState('all');

  const handleToggleClick = (taskId) => {
    onToggleTask(taskId);
  };

  const handleClearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount === 0) {
      alert('No hay tareas completadas para eliminar');
      return;
    }
    if (window.confirm(`¿Eliminar ${completedCount} tarea${completedCount > 1 ? 's' : ''} completada${completedCount > 1 ? 's' : ''}?`)) {
      onClearCompleted();
    }
  };

  const handleDeleteAll = () => {
    if (tasks.length === 0) {
      alert('No hay tareas para eliminar');
      return;
    }
    if (window.confirm(`¿Eliminar TODAS las ${tasks.length} tareas? Esta acción no se puede deshacer.`)) {
      onDeleteAll();
    }
  };

  // Filtrar tareas según el filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tareas disponibles</p>
        <small>Agrega tu primera tarea usando el formulario de arriba</small>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Lista de Tareas</h2>
        <div className="task-stats">
          <span className="stat-item">
            <strong>{tasks.length}</strong> Total
          </span>
          <span className="stat-item">
            <strong>{pendingCount}</strong> Pendientes
          </span>
          <span className="stat-item">
            <strong>{completedCount}</strong> Completadas
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas ({tasks.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes ({pendingCount})
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completadas ({completedCount})
        </button>
      </div>

      {/* Botones de acciones masivas - SOLO ESTOS */}
      <div className="bulk-actions">
        <button 
          className="bulk-btn clear-completed"
          onClick={handleClearCompleted}
          disabled={completedCount === 0}
        >
          🗑️ Limpiar Completadas ({completedCount})
        </button>
        <button 
          className="bulk-btn delete-all"
          onClick={handleDeleteAll}
          disabled={tasks.length === 0}
        >
          ⚠️ Eliminar Todas
        </button>
      </div>

      {/* Lista de tareas - NUEVA ESTRUCTURA SIMPLIFICADA */}
      {filteredTasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>No hay tareas {filter === 'completed' ? 'completadas' : filter === 'pending' ? 'pendientes' : ''}</p>
        </div>
      ) : (
        <div className="tasks-container">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}
            >
              {/* Checkbox a la izquierda */}
              <div className="task-checkbox-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleClick(task.id)}
                  className="task-checkbox"
                />
              </div>
              
              {/* Título de la tarea */}
              <div className="task-title-container">
                <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </span>
              </div>
              
              {/* Prioridad a la derecha */}
              <div className="task-priority-container">
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;