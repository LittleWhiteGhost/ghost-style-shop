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
  Ghost,
} from 'lucide-react';

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
          <Ghost className="logo-icon" size={26} strokeWidth={2} />
          <span className="logo-text">GHOST STYLE</span>
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
