import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { OrderService } from '../services/orders';
import { TelegramService } from '../services/telegram';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    city: '',
    comment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const orderData = {
        userId: user.uid,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        shippingAddress: formData
      };

      // Сохраняем заказ в Firestore
      const orderId = await OrderService.createOrder(orderData);

      // Отправляем уведомление в Telegram
      await TelegramService.sendOrderNotification({
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        shippingAddress: formData
      });

      clearCart();
      navigate('/order-success', { state: { orderId } });
    } catch (error) {
      console.error('Order error:', error);
      alert('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="page">
      <div className="section-header">
        <h2>Оформление заказа</h2>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-section">
          <h3>Контактные данные</h3>
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>
        </div>

        <div className="checkout-section">
          <h3>Адрес доставки</h3>
          <div className="form-group">
            <label>Город</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Город"
              required
            />
          </div>
          <div className="form-group">
            <label>Адрес</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Улица, дом, квартира"
              required
            />
          </div>
          <div className="form-group">
            <label>Комментарий</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Комментарий к заказу"
              rows={3}
            />
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Ваш заказ</h3>
          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x{item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Итого:</span>
            <span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        <button type="submit" className="btn-checkout" disabled={loading}>
          {loading ? 'Оформление...' : 'Подтвердить заказ'}
        </button>
      </form>
    </div>
  );
}
