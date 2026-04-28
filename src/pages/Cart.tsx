import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

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
          <ShoppingCart size={72} strokeWidth={1.5} />
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
                {/* BUG FIX: при quantity===1 кнопка "−" удаляет товар — заменяем на иконку корзины */}
                <button
                  onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1)}
                  aria-label={item.quantity === 1 ? 'Удалить' : 'Уменьшить'}
                  style={{ color: item.quantity === 1 ? 'var(--color-danger, #e24b4a)' : undefined }}
                >
                  {item.quantity === 1 ? <Trash2 size={16} strokeWidth={2} /> : <Minus size={16} strokeWidth={2.4} />}
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Увеличить"
                >
                  <Plus size={16} strokeWidth={2.4} />
                </button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Удалить">
                <Trash2 size={18} strokeWidth={2} />
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
