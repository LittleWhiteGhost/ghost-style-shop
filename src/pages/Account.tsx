import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { AuthService } from '../services/auth';
import { OrderService } from '../services/orders';
import { useLang } from '../i18n/LanguageContext';

export default function Account() {
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { t } = useLang();
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    if (!user?.uid) {
      setOrderCount(0);
      return;
    }
    OrderService.getUserOrders(user.uid)
      .then(orders => {
        if (alive) setOrderCount(orders.length);
      })
      .catch(() => {
        if (alive) setOrderCount(0);
      });
    return () => {
      alive = false;
    };
  }, [user?.uid]);

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  const ordersSubtitle =
    orderCount === null
      ? '...'
      : orderCount === 0
        ? t('accountOrdersZero')
        : t('accountOrdersCount', { n: orderCount });

  const favSubtitle =
    wishlistItems.length === 0
      ? t('accountFavoritesZero')
      : t('accountFavoritesCount', { n: wishlistItems.length });

  return (
    <div className="page">
      <div className="section-header">
        <h2>{t('accountTitle')}</h2>
        <p className="section-subtitle">{t('accountSubtitle')}</p>
      </div>

      <div className="account-info">
        <div className="user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'User'} />
          ) : (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
              <circle cx="50" cy="35" r="18"/>
              <path d="M20 85c0-18 13-30 30-30s30 12 30 30"/>
            </svg>
          )}
        </div>
        <h3>{user?.displayName || user?.email || t('accountGuest')}</h3>
        {user?.email && <p className="user-email">{user.email}</p>}

        <div className="account-menu">
          <a href="#" className="account-item" onClick={(e) => e.preventDefault()}>
            <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M16 16v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1M20 10V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2M4 18l2-8h12l2 8H4z"/>
            </svg>
            <div className="item-content">
              <span className="item-title">{t('accountOrders')}</span>
              <span className="item-subtitle">{ordersSubtitle}</span>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
          <a className="account-item" onClick={() => navigate('/wishlist')}>
            <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="item-content">
              <span className="item-title">{t('accountFavorites')}</span>
              <span className="item-subtitle">{favSubtitle}</span>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
          <a href="#" className="account-item" onClick={(e) => e.preventDefault()}>
            <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            <div className="item-content">
              <span className="item-title">{t('accountAddresses')}</span>
              <span className="item-subtitle">{t('accountAddressesZero')}</span>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
          <a href="#" className="account-item" onClick={(e) => e.preventDefault()}>
            <svg className="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <path d="M1 10h22"/>
            </svg>
            <div className="item-content">
              <span className="item-title">{t('accountPayments')}</span>
              <span className="item-subtitle">{t('accountPaymentsZero')}</span>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          {t('accountLogout')}
        </button>
      </div>
    </div>
  );
}
