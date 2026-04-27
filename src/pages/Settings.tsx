import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { Lang } from '../i18n/dictionaries';
import PageHead from '../components/PageHead';

export default function Settings() {
  const { lang, setLang, t } = useLang();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [notifications, setNotifications] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="page">
      <PageHead num="№06" title={t('settingsTitle')} meta={t('settingsMeta')} />

      <div className="settings-section">
        <h3 className="section-title">{t('settingsAppearance')}</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <div>
                <span className="setting-title">{t('settingsDark')}</span>
                <span className="setting-subtitle">{t('settingsDarkSub')}</span>
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
        <h3 className="section-title">{t('settingsNotif')}</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div>
                <span className="setting-title">{t('settingsPush')}</span>
                <span className="setting-subtitle">{t('settingsPushSub')}</span>
              </div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <div>
                <span className="setting-title">{t('settingsEmail')}</span>
                <span className="setting-subtitle">{t('settingsEmailSub')}</span>
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
        <h3 className="section-title">{t('settingsRegion')}</h3>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <div>
                <span className="setting-title">{t('settingsLanguage')}</span>
              </div>
            </div>
            <select
              className="language-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="uz">O'zbek</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">{t('settingsAbout')}</h3>
        <div className="settings-list">
          <div className="setting-item clickable">
            <div className="setting-left">
              <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <div>
                <span className="setting-title">{t('settingsAboutItem')}</span>
                <span className="setting-subtitle">{t('settingsAboutSub')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
