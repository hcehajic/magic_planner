import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

import TaskForm from './TaskForm';

function Calendar(props) {
  const [currentYear, setCurrentYear] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskFormPopup, setShowTaskFormPopup] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth());
  }, []);

  const openTaskForm = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    setSelectedDate(formattedDate);
    setShowTaskFormPopup(true);
  };

  const closeTaskForm = () => {
    setShowTaskFormPopup(false);
  };

  const onAddingTask = () => {
    setShowTaskFormPopup(false);
  };

  const handleChangeMonth = (amount) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + amount;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleChangeYear = (amount) => {
    setCurrentYear((prevYear) => prevYear + amount);
  };

  const getMonthName = (month) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(month);
  };

  const getMonthNameBa = (month) => {
    const months = [
      'Januar',
      'Februar',
      'Mart',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'August',
      'Septembar',
      'Oktobar',
      'Novembar',
      'Decembar',
    ];

    if (month === 'January') return months[0];
    if (month === 'February') return months[1];
    if (month === 'March') return months[2];
    if (month === 'April') return months[3];
    if (month === 'May') return months[4];
    if (month === 'June') return months[5];
    if (month === 'July') return months[6];
    if (month === 'August') return months[7];
    if (month === 'September') return months[8];
    if (month === 'October') return months[9];
    if (month === 'November') return months[10];
    if (month === 'December') return months[11];

    return month;
  };

  // Group tasks by date
  const tasksByDate = new Map();
  props.tasks.forEach((task) => {
    const dueDate = task.dueDate.substring(0, 10);
    const taskList = tasksByDate.get(dueDate) || [];
    taskList.push(task);
    tasksByDate.set(dueDate, taskList);
  });

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const datesOfMonth = [];
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstDayOfMonth; i > 0; i--) {
    datesOfMonth.push({ date: new Date(currentYear, prevMonth, daysInPrevMonth - i + 1), isCurrentMonth: false });
  }
  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    datesOfMonth.push({ date: new Date(currentYear, currentMonth, i), isCurrentMonth: true });
  }
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const remainingDays = (7 - (firstDayOfMonth + numberOfDaysInMonth) % 7) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    datesOfMonth.push({ date: new Date(currentYear, nextMonth, i), isCurrentMonth: false });
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => handleChangeYear(-1)}>
          &lt;&lt;
          Godina nazad
        </button>
        <button className="nav-button" onClick={() => handleChangeMonth(-1)}>
          &lt;
          Mjesec nazad
        </button>
        <label className="calendar-label">
          <span className="calendar-month">{getMonthNameBa(getMonthName(new Date(currentYear, currentMonth, 1)))}</span>
          <br />
          <span className="calendar-year">{currentYear}</span>
        </label>
        <button className="nav-button" onClick={() => handleChangeMonth(1)}>
          Mjesec naprijed
          &gt;
        </button>
        <button className="nav-button" onClick={() => handleChangeYear(1)}>
          Godina naprijed
          &gt;&gt;
        </button>
      </div>
      <div className="calendar-weekdays">
        <div className="weekday">Ned</div>
        <div className="weekday">Pon</div>
        <div className="weekday">Uto</div>
        <div className="weekday">Sri</div>
        <div className="weekday">Čet</div>
        <div className="weekday">Pet</div>
        <div className="weekday">Sub</div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-dates">
          {datesOfMonth.map((dateObj, index) => {
            const { date, isCurrentMonth } = dateObj;
            const dateString = isCurrentMonth ? date.toISOString().substring(0, 10) : '';
            const tasksForDate = tasksByDate.get(dateString) || [];

            return (
              <div
                key={dateString || index}
                className={`calendar-date ${tasksForDate.length > 0 ? 'has-tasks' : ''} ${isCurrentMonth ? '' : 'empty-day'
                  }`}
                onClick={() => isCurrentMonth && openTaskForm(dateString)}
              >
                {dateString ? <div className="date">{date.getDate()}</div> : <div>&nbsp;</div>}
                <ul className="task-list">
                  {tasksForDate.map((task) => (
                    <li key={task.id}>{task.taskName}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      {showTaskFormPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <TaskForm
              selectedDate={selectedDate}
              defaultDueDate={selectedDate}
              onCancel={closeTaskForm}
              onAddTask={props.onAddTask}
              accountId={props.accountId}
              isCalendar={true}
              onAddingTask={onAddingTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
