import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    // Загружаем сохранённую тему из localStorage
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [notifications, setNotifications] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(false);
  const [language, setLanguage] = useState('ru');

  // Синхронизируем тему при изменении darkMode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="page">
      <div className="section-header">
        <h2>Настройки</h2>
        <p className="section-subtitle">Параметры приложения</p>
      </div>
      
      <div className="settings-section">
        <h3 className="section-title">Внешний вид</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <div>
                <span className="setting-title">Темная тема</span>
                <span className="setting-subtitle">Переключить оформление</span>
              </div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Уведомления</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div>
                <span className="setting-title">Push уведомления</span>
                <span className="setting-subtitle">Уведомления о заказах</span>
              </div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <div>
                <span className="setting-title">Email рассылка</span>
                <span className="setting-subtitle">Новости и акции</span>
              </div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={emailNewsletter} onChange={() => setEmailNewsletter(!emailNewsletter)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Региональные настройки</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <div>
                <span className="setting-title">Язык</span>
              </div>
            </div>
            <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="uz">O'zbek</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">О приложении</h3>
        <div className="settings-list">
          <div className="setting-item clickable">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
              </svg>
              <div>
                <span className="setting-title">О нас</span>
                <span className="setting-subtitle">NOIR &amp; FLAME v1.0</span>
              </div>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
