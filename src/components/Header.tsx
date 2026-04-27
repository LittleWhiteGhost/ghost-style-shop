import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../i18n/LanguageContext';
import { isAdmin } from '../utils/admin';
import {
  Heart,
  ShoppingBag,
  Home,
  Sparkles,
  User,
  Settings as SettingsIcon,
  ShieldCheck,
  Menu,
  X,
  Info,
  AtSign,
} from 'lucide-react';

function NoirFlameMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <rect x="0" y="0" width="36" height="36" fill="var(--ink)" />
        <polygon points="8,30 18,4 22,12 16,18 26,18 30,30" fill="var(--accent)" />
        <polygon points="4,22 32,8 32,12 4,26" fill="var(--cream)" opacity="0.95" />
        <rect x="24" y="24" width="2" height="2" fill="var(--cream)" />
        <rect x="28" y="22" width="2" height="2" fill="var(--cream)" />
        <rect x="22" y="28" width="2" height="2" fill="var(--cream)" />
      </svg>
    </span>
  );
}

export default function Header() {
  const { itemCount } = useCart();
  const { items } = useWishlist();
  const { user } = useAuth();
  const { t } = useLang();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const userIsAdmin = isAdmin(user?.email);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // lock body scroll when open + close on Escape
  useEffect(() => {
    if (open) {
      document.body.classList.add('drawer-open');
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.classList.remove('drawer-open');
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open]);

  const items_: Array<{ to: string; label: string; icon: JSX.Element }> = [
    { to: '/', label: t('navCatalog'), icon: <Home size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
    { to: '/new', label: t('navNew'), icon: <Sparkles size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
    { to: '/about', label: t('navAbout'), icon: <Info size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
    { to: '/contacts', label: t('navContacts'), icon: <AtSign size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
    { to: '/account', label: t('navAccount'), icon: <User size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
    { to: '/settings', label: t('navSettings'), icon: <SettingsIcon size={26} strokeWidth={2.8} absoluteStrokeWidth /> },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            type="button"
            className="burger-btn"
            onClick={() => setOpen(true)}
            aria-label={t('menuOpen')}
            aria-expanded={open}
            aria-controls="primary-drawer"
          >
            <Menu size={24} strokeWidth={3} absoluteStrokeWidth />
          </button>
          <Link to="/" className="logo">
            <NoirFlameMark />
            <span className="logo-text">NOIR<span className="amp">&amp;</span>FLAME</span>
          </Link>
        </div>
        <div className="header-actions">
          {userIsAdmin && (
            <Link to="/admin" className={`header-action-btn ${isActive('/admin') ? 'active' : ''}`} aria-label={t('navAdmin')}>
              <ShieldCheck size={22} strokeWidth={2.8} absoluteStrokeWidth />
            </Link>
          )}
          <Link to="/wishlist" className="header-action-btn" aria-label={t('navWishlist')}>
            <Heart size={22} strokeWidth={2.8} absoluteStrokeWidth />
            {items.length > 0 && <span className="action-badge">{items.length}</span>}
          </Link>
          <Link to="/cart" className="header-action-btn" aria-label={t('navCart')}>
            <ShoppingBag size={22} strokeWidth={2.8} absoluteStrokeWidth />
            {itemCount > 0 && <span className="action-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>

      {/* slide-out drawer */}
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        id="primary-drawer"
        className={`drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label={t('menuLabel')}
      >
        <div className="drawer-head">
          <span className="drawer-eyebrow">{t('menuLabel')} / 01</span>
          <button
            type="button"
            className="drawer-close"
            onClick={() => setOpen(false)}
            aria-label={t('menuClose')}
          >
            <X size={22} strokeWidth={3} absoluteStrokeWidth />
          </button>
        </div>

        <nav className="drawer-nav" aria-label={t('menuLabel')}>
          {items_.map((it, i) => (
            <Link
              key={it.to}
              to={it.to}
              className={`drawer-link ${isActive(it.to) ? 'active' : ''}`}
            >
              <span className="drawer-link__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="drawer-link__icon" aria-hidden="true">{it.icon}</span>
              <span className="drawer-link__label">{it.label}</span>
            </Link>
          ))}
          {userIsAdmin && (
            <Link
              to="/admin"
              className={`drawer-link drawer-link--admin ${isActive('/admin') ? 'active' : ''}`}
            >
              <span className="drawer-link__num">★</span>
              <span className="drawer-link__icon" aria-hidden="true">
                <ShieldCheck size={26} strokeWidth={2.8} absoluteStrokeWidth />
              </span>
              <span className="drawer-link__label">{t('navAdmin')}</span>
            </Link>
          )}
        </nav>

        <div className="drawer-foot">
          <span>{t('menuFooter')}</span>
        </div>
      </aside>
    </header>
  );
}
