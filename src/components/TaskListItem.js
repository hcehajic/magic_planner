import React, { useEffect, useState, useCallback } from 'react';
import '../styles/TaskListItem.css';

const API_BASE_URL = 'https://zavrsni-back.herokuapp.com';
// const API_BASE_URL = 'http://localhost:8080';

function TaskListItem(props) {
  const { task, onDeleteTask } = props;
  const [newSubTask, setNewSubTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  const fetchSubTasks = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub/${task.id}`, { mode: 'cors' });
      const data = await response.json();
      setSubTasks(data);
    } catch (error) {
      console.error('Failed to fetch sub tasks:', error);
    }
  }, [task.id]);

  useEffect(() => {
    fetchSubTasks();
  }, [task, fetchSubTasks]);

  const handleAddSubTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newSubTask, accountId: task.accountId, taskId: task.id }),
      });

      if (response.ok) {
        setNewSubTask('');
        fetchSubTasks();
      } else {
        console.error('Failed to add subtask:', response.status);
      }
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };

  const handleDeleteSubTask = async (subTaskId) => {
    try {
      console.log(subTaskId);
      await fetch(`${API_BASE_URL}/api/v1/task/sub/${subTaskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchSubTasks();
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  return (
    <li className="task-list-item">
      <div className="task-list-item-header">
        <h3 className="task-list-item-title">Ime zadatka: {task.taskName}</h3>
        <button className="delete-button" onClick={handleDeleteClick}>
          Obriši zadatak
        </button>
      </div>
      <p className="task-list-item-description">Opis: {task.description}</p>
      <p className="task-list-item-date">Na ovaj datum: {new Date(task.dueDate).toLocaleDateString('en-GB')}</p>
      <p className="task-list-item-time">U ovoliko sati: {task.dueTime}</p>
      <p className="task-list-item-time">Prioritetni zadatak: {task.priority ? "DA" : "NE"}</p>

      <div className="sub-tasks-container">
        <h4>Podzadaci:</h4>
        {subTasks.map((subTask) => (
          <div key={subTask.id} className="sub-task-item">
            <p>{subTask.description}</p>
            <button className="delete-subtask-button" onClick={() => handleDeleteSubTask(subTask.id)}>
              Obriši podzadatak
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddSubTask}>
        <input
          type="text"
          name="subTaskName"
          placeholder="Dodaj podzadatak"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
        />
        <button type="submit">Dodaj podzadatak</button>
      </form>
    </li>
  );
}

export default TaskListItem;
