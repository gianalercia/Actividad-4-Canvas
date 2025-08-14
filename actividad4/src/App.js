import React, { useState, useEffect } from 'react';
import { Header, TaskForm, TaskList } from './components';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        const adaptedTasks = data.map(task => ({
          ...task,
          priority: ['alta', 'media', 'baja'][Math.floor(Math.random() * 3)]
        }));
        
        setTasks(adaptedTasks);
      } catch (err) {
        console.error('Error al cargar tareas:', err);
        setError('No se pudieron cargar las tareas iniciales');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Solo funciones de eliminación masiva
  const handleClearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando tareas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header sin contador de tareas */}
        <Header title="Gestor de Tareas React" />
        <TaskForm onAddTask={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          onToggleTask={handleToggleTask}
          onClearCompleted={handleClearCompleted}
          onDeleteAll={handleDeleteAll}
        />
      </div>
    </div>
  );
};

export default App;