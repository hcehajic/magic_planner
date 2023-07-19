
import React, { useState } from 'react';
import '../styles/Calendar.css';

const Calendar = (props) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskFormPopup, setShowTaskFormPopup] = useState(false);

  const handleChangeMonth = (amount) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + amount);
      return newDate;
    });
  };

  const handleChangeYear = (amount) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(prevDate.getFullYear() + amount);
      return newDate;
    });
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
    return months[month];
  };

  const getDaysOfWeek = () => {
    const daysOfWeek = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
    return daysOfWeek.map((day) => (
      <div key={day} className="week-day">
        {day}
      </div>
    ));
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthLastDate = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    const weeks = [];
    let week = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthLastDate - i;
      week.push(
        <div key={`day-prev-${day}`} className="calendar-day prev-month-day">
          {day}
        </div>
      );
    }

    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(year, month, i);
      const formattedDate = currentDate.toISOString().substring(0, 10);
      const tasks = props.tasksByDate.get(formattedDate) || [];

      week.push(
        <div
          key={currentDate}
          className={`calendar-day ${tasks.length > 0 ? 'has-tasks' : ''}`}
          onClick={() => openTaskForm(formattedDate)}
        >
          <div className="date-number">{i}</div>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task} className="task">{task}</div>
            ))}
          </div>
        </div>
      );

      if (currentDate.getDay() === 6) {
        weeks.push(week);
        week = [];
      }
    }

    const remainingDays = 7 - week.length;

    for (let i = 1; i <= remainingDays; i++) {
      const day = i;
      week.push(
        <div key={`day-next-${day}`} className="calendar-day next-month-day">
          {day}
        </div>
      );
    }

    weeks.push(week);

    return weeks.map((week, index) => (
      <div key={`week-${index}`} className="calendar-week">
        {week}
      </div>
    ));
  };

  const openTaskForm = (date) => {
    setSelectedDate(date);
    setShowTaskFormPopup(true);
  };

  const closeTaskForm = () => {
    setShowTaskFormPopup(false);
  };

  const onAddingTask = () => {
    setShowTaskFormPopup(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => handleChangeYear(-1)}>
          &lt;&lt;
        </button>
        <button className="nav-button" onClick={() => handleChangeMonth(-1)}>
          &lt;
        </button>
        <h2 className="header-text">
          {getMonthNameBa(date.getMonth())} {date.getFullYear()}
        </h2>
        <button className="nav-button" onClick={() => handleChangeMonth(1)}>
          &gt;
        </button>
        <button className="nav-button" onClick={() => handleChangeYear(1)}>
          &gt;&gt;
        </button>
      </div>
      <div className="calendar-days">{getDaysOfWeek()}</div>
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
