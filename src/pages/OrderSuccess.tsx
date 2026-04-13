import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="page order-success-page">
      <div className="success-content">
        <svg className="success-icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="45"/>
          <path d="M30 50l15 15 25-25"/>
        </svg>
        <h1>Заказ оформлен!</h1>
        <p className="order-id">Номер заказа: #{orderId?.slice(0, 8)}</p>
        <p className="success-text">
          Мы свяжемся с вами для подтверждения заказа
        </p>
        <div className="success-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
}
