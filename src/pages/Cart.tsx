import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ProductIllustration from '../components/ProductIllustration';
import { useLang } from '../i18n/LanguageContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

function isPlaceholder(image: string | undefined): boolean {
  if (!image) return true;
  const lc = image.toLowerCase();
  return lc.includes('placehold') || lc.includes('via.placeholder') || !/^https?:|^data:/.test(lc);
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { t } = useLang();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page cart-page">
        <BackButton to="/" label={t('cartGoToCatalog')} />
        <div className="section-header">
          <h2>{t('cartTitle')}</h2>
        </div>
        <div className="empty-cart">
          <ShoppingCart size={72} strokeWidth={1.5} />
          <h3>{t('cartEmpty')}</h3>
          <p>{t('cartEmptyHint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <BackButton to="/" label={t('cartGoToCatalog')} />
      <div className="section-header">
        <h2>{t('cartTitle')}</h2>
        <p className="section-subtitle">{t('inCart', { n: items.reduce((s, i) => s + i.quantity, 0) })}</p>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {isPlaceholder(item.image) ? (
                <ProductIllustration title={item.name} />
              ) : (
                <img src={item.image} alt={item.name} />
              )}
            </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label={t('decrease')}
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={t('increase')}
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label={t('cartRemove')}>
                <Trash2 size={18} strokeWidth={2.8} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>{t('cartTotal')}:</span>
          <span className="total-price">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button className="btn-checkout" onClick={() => navigate('/checkout')}>{t('cartCheckout')}</button>
        <button className="btn-clear" onClick={clearCart}>{t('cartClear')}</button>
      </div>
    </div>
  );
}
