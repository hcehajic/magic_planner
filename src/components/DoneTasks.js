import React, { useEffect, useState, useCallback } from 'react';
import TaskListItem from './TaskListItem'; 
import '../styles/DoneTasks.css';

const API_BASE_URL = 'https://zavrsni-be-ba8430d30a0c.herokuapp.com'; 

function DoneTasks(props) {
  const { tasks, onDeleteTask, uid } = props;
  const [doneTasks, setDoneTasks] = useState([]);

  const fetchDoneTasks = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/alldone/${uid}`, { mode: 'cors' });
      const data = await response.json();
      setDoneTasks(data);
    } catch (error) {
      console.error('Failed to fetch done tasks:', error);
    }
  }, [uid]);

  useEffect(() => {
    fetchDoneTasks();
  }, [fetchDoneTasks]);

  return (
    <div>
      <h2>Urađeni zadaci</h2>
      <ul>
      {doneTasks.length === 0 ? (
        <p>Nema urađenih zadataka</p>
      ) : (
        <ul>
          {doneTasks.map((task) => (
            <TaskListItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
          ))}
        </ul>
      )}
      </ul>
    </div>
  );
}

export default DoneTasks;
