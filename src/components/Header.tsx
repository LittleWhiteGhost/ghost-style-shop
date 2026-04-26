import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/admin';
import {
  Heart,
  ShoppingBag,
  Home,
  Sparkles,
  User,
  Settings as SettingsIcon,
  ShieldCheck,
} from 'lucide-react';

function NoirFlameMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="36" height="36" fill="var(--ink)" />
        <path d="M10 28 L20 6 L26 16 L22 28 Z" fill="var(--accent)" />
        <circle cx="14" cy="14" r="1.4" fill="var(--cream)" />
        <circle cx="20" cy="14" r="1.4" fill="var(--cream)" />
        <circle cx="14" cy="20" r="1.4" fill="var(--cream)" />
        <circle cx="20" cy="20" r="1.4" fill="var(--cream)" />
      </svg>
    </span>
  );
}

export default function Header() {
  const { itemCount } = useCart();
  const { items } = useWishlist();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const userIsAdmin = isAdmin(user?.email);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <NoirFlameMark />
          <span className="logo-text">NOIR<span className="amp">&amp;</span>FLAME</span>
        </Link>
        <div className="header-actions">
          {userIsAdmin && (
            <Link to="/admin" className={`header-action-btn ${isActive('/admin') ? 'active' : ''}`} aria-label="Админ-панель">
              <ShieldCheck size={22} strokeWidth={2} />
            </Link>
          )}
          <Link to="/wishlist" className="header-action-btn" aria-label="Избранное">
            <Heart size={22} strokeWidth={2} />
            {items.length > 0 && <span className="action-badge">{items.length}</span>}
          </Link>
          <Link to="/cart" className="header-action-btn" aria-label="Корзина">
            <ShoppingBag size={22} strokeWidth={2} />
            {itemCount > 0 && <span className="action-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>

      <nav className="bottom-nav">
        <Link to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
          <Home className="nav-icon" size={22} strokeWidth={2} />
          <span>Каталог</span>
        </Link>
        <Link to="/new" className={`nav-btn ${isActive('/new') ? 'active' : ''}`}>
          <Sparkles className="nav-icon" size={22} strokeWidth={2} />
          <span>Новинки</span>
        </Link>
        <Link to="/account" className={`nav-btn ${isActive('/account') ? 'active' : ''}`}>
          <User className="nav-icon" size={22} strokeWidth={2} />
          <span>Аккаунт</span>
        </Link>
        <Link to="/settings" className={`nav-btn ${isActive('/settings') ? 'active' : ''}`}>
          <SettingsIcon className="nav-icon" size={22} strokeWidth={2} />
          <span>Настройки</span>
        </Link>
      </nav>
    </header>
  );
}
