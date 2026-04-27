import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { useLang } from '../i18n/LanguageContext';
import BackButton from '../components/BackButton';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      await AuthService.registerWithEmail(email, password, name);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      await AuthService.loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации через Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-back">
          <BackButton to="/" />
        </div>
        <Link to="/" className="auth-logo">
          <span className="logo-mark logo-mark--auth" aria-hidden="true">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
              <rect x="0" y="0" width="36" height="36" fill="#0a0a0a" />
              <polygon points="8,30 18,4 22,12 16,18 26,18 30,30" fill="#ff5a1f" />
              <polygon points="4,22 32,8 32,12 4,26" fill="#f5e6d3" opacity="0.95" />
              <rect x="24" y="24" width="2" height="2" fill="#f5e6d3" />
              <rect x="28" y="22" width="2" height="2" fill="#f5e6d3" />
              <rect x="22" y="28" width="2" height="2" fill="#f5e6d3" />
            </svg>
          </span>
          <span>NOIR&nbsp;&amp;&nbsp;FLAME</span>
        </Link>

        <h1>{t('registerTitle')}</h1>
        <p className="auth-subtitle">{t('registerSubtitle')}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t('registerName')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('registerNamePlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('loginEmail')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('loginPassword')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              required
            />
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '...' : t('registerSubmit')}
          </button>
        </form>

        <div className="auth-divider">{t('loginOr')}</div>

        <button className="btn-google" onClick={handleGoogleRegister} disabled={loading}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t('loginGoogle')}
        </button>

        <p className="auth-footer">
          {t('registerHaveAccount')} <Link to="/login">{t('registerLoginCta')}</Link>
        </p>
      </div>
    </div>
  );
}
