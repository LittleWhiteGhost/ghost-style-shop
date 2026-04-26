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
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <rect x="0" y="0" width="36" height="36" fill="var(--ink)" />
        {/* sharp angular flame: 4 hard cuts, no curves */}
        <polygon points="8,30 18,4 22,12 16,18 26,18 30,30" fill="var(--accent)" />
        {/* hard diagonal slash through the flame */}
        <polygon points="4,22 32,8 32,12 4,26" fill="var(--cream)" opacity="0.95" />
        <polygon points="4,22 32,8 32,12 4,26" fill="var(--ink)" opacity="0.0" />
        {/* halftone-style square dots, not circles */}
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
              <ShieldCheck size={22} strokeWidth={2.8} absoluteStrokeWidth />
            </Link>
          )}
          <Link to="/wishlist" className="header-action-btn" aria-label="Избранное">
            <Heart size={22} strokeWidth={2.8} absoluteStrokeWidth />
            {items.length > 0 && <span className="action-badge">{items.length}</span>}
          </Link>
          <Link to="/cart" className="header-action-btn" aria-label="Корзина">
            <ShoppingBag size={22} strokeWidth={2.8} absoluteStrokeWidth />
            {itemCount > 0 && <span className="action-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>

      <nav className="bottom-nav">
        <Link to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
          <Home className="nav-icon" size={22} strokeWidth={2.8} absoluteStrokeWidth />
          <span>Каталог</span>
        </Link>
        <Link to="/new" className={`nav-btn ${isActive('/new') ? 'active' : ''}`}>
          <Sparkles className="nav-icon" size={22} strokeWidth={2.8} absoluteStrokeWidth />
          <span>Новинки</span>
        </Link>
        <Link to="/account" className={`nav-btn ${isActive('/account') ? 'active' : ''}`}>
          <User className="nav-icon" size={22} strokeWidth={2.8} absoluteStrokeWidth />
          <span>Аккаунт</span>
        </Link>
        <Link to="/settings" className={`nav-btn ${isActive('/settings') ? 'active' : ''}`}>
          <SettingsIcon className="nav-icon" size={22} strokeWidth={2.8} absoluteStrokeWidth />
          <span>Настройки</span>
        </Link>
      </nav>
    </header>
  );
}
