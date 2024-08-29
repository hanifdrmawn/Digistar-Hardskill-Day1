import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Praproposal Skripsi', deadline: '2024-08-15', completed: false },
    { id: 2, name: 'Proposal Skripsi', deadline: '2024-08-31', completed: false },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', deadline: '' });

  useEffect(() => {
    document.title = 'To Do List';
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://png.pngtree.com/png-clipart/20221021/original/pngtree-red-fire-emoji-png-image_8709795.png';
    document.head.appendChild(link);
  }, []);
  
  const addTask = () => {
    if (newTask.name && newTask.deadline) {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask, completed: false }]);
      setNewTask({ name: '', deadline: '' });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask({ name: task.name, deadline: task.deadline });
  };

  const updateTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, name: newTask.name, deadline: newTask.deadline } : task
    ));
    setEditingTask(null);
    setNewTask({ name: '', deadline: '' });
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatDateForDisplay = (date) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const [year, month, day] = date.split('-');
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="app-container">
      <h1>To Do List SKRIPSI</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Tugas</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={task.completed ? 'completed' : ''}>
              <td>{task.name}</td>
              <td>{formatDateForDisplay(task.deadline)}</td>
              <td>
                <button onClick={() => editTask(task)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                <button onClick={() => completeTask(task.id)} className="complete-btn">Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-task-form">
        <input 
          type="text" 
          placeholder="Nama Tugas" 
          value={newTask.name} 
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} 
        />
        <input 
          type="date" 
          value={newTask.deadline} 
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} 
        />
        <button onClick={editingTask ? updateTask : addTask} className="add-btn">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </div>
  );
}

export default App;
