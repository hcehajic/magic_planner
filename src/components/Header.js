import React from 'react';
import '../styles/Header.css';

function Header({ isAuthenticated, onLogout, onAddTask, onSettings, onHome, onCalendar, onDone }) {
  const handleLogoutClick = () => {
    onLogout();
    window.location.reload();
  };

  const handleAddTaskClick = () => {
    onAddTask();
  };

  const handleSettingsClick = () => {
    onSettings();
  };

  const handleHomeClick = () => {
    onHome();
  };

  const handleDoneClick = () => {
    onDone();
  };

  const handleCalendarClick = () => {
    onCalendar();
  };

  return (
    <header className="header">
      <div className="logo">Magic Planner</div>
      {isAuthenticated && (
        <nav className="nav">
          <div className="nav-item">
            <button className="nav-link" onClick={handleHomeClick}>Početna</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleDoneClick}>Urađeni zadaci</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleAddTaskClick}>Dodaj zadatak</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleSettingsClick}>Postavke</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleCalendarClick}>Kalendar</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleLogoutClick}>Odjavi se</button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
