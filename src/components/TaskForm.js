import React, { useState } from 'react';

import '../styles/TaskForm.css';

function TaskForm(props) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [creationTime, setCreationTime] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      return;
    }
    console.log(creationDate);
    if (props.isCalendar) {
      setCreationDate(props.defaultDueDate);
    }
    props.onAddTask(taskName, description, creationDate, creationTime, props.accountId, priority, props.isCalendar);
    setTaskName('');
    setDescription('');
    setCreationDate('');
    setCreationTime('');
    if (props.isCalendar) {
      props.onAddingTask();
    }
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskName">Ime zadatka:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <label htmlFor="description">Opis:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <label htmlFor="creationDate">Na ovaj datum:</label>
      <input
        type="date"
        id="creationDate"
        value={creationDate || props.defaultDueDate}
        onChange={(e) => setCreationDate(e.target.value)}
      />

      <label htmlFor="creationTime">U ovoliko sati:</label>
      <div className="time-info">
        <input
          type="time"
          id="creationTime"
          value={creationTime}
          onChange={(e) => setCreationTime(e.target.value)}
        />
      </div>

      <div className="priority-switch">
        <label htmlFor="priority">Prioritet:</label>
        <label className="switch-priority">
          <input
            type="checkbox"
            id="priority"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <button type="submit">Dodaj zadatak</button>
      <button type="button" onClick={handleCancel} className="CancelButton">
        Otkaži
      </button>
    </form>
  );
}

export default TaskForm;
