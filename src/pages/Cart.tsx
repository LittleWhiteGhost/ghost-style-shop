import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page cart-page">
        <BackButton to="/" label="К каталогу" />
        <div className="section-header">
          <h2>Корзина</h2>
        </div>
        <div className="empty-cart">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M30 40h40M35 40V30h30v10M25 40h50v45H25V40z"/>
          </svg>
          <h3>Корзина пуста</h3>
          <p>Добавьте товары из каталога</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <BackButton to="/" label="К каталогу" />
      <div className="section-header">
        <h2>Корзина</h2>
        <p className="section-subtitle">{items.length} товар(ов)</p>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Итого:</span>
          <span className="total-price">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button className="btn-checkout" onClick={() => navigate('/checkout')}>Оформить заказ</button>
        <button className="btn-clear" onClick={clearCart}>Очистить корзину</button>
      </div>
    </div>
  );
}
