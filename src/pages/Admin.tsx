import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProductService, Product } from '../services/products';
import { OrderService, Order } from '../services/orders';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    image: '',
    isNew: false,
    description: ''
  });

  // Проверка админа (замените email на ваш)
  useEffect(() => {
    if (!user || user.email !== 'otaevfarruhjon@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const prods = await ProductService.getAllProducts();
        setProducts(prods);
      } else {
        // Загрузить все заказы (для админа)
        const allOrders = await OrderService.getUserOrders(user?.uid || '');
        setOrders(allOrders);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProductService.addProduct(newProduct as Product);
      setNewProduct({ name: '', price: 0, category: '', image: '', isNew: false, description: '' });
      loadData();
    } catch (error) {
      console.error('Add product error:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Удалить товар?')) {
      await ProductService.deleteProduct(id);
      loadData();
    }
  };

  if (!user || user.email !== 'otaevfarruhjon@gmail.com') {
    return null;
  }

  return (
    <div className="page admin-page">
      <div className="section-header">
        <h2>Админ-панель</h2>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Товары
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Заказы
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-products">
          <h3>Добавить товар</h3>
          <form onSubmit={handleAddProduct} className="admin-form">
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Цена</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Категория</label>
              <input
                type="text"
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>URL изображения</label>
              <input
                type="url"
                value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                rows={3}
              />
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newProduct.isNew}
                onChange={e => setNewProduct({ ...newProduct, isNew: e.target.checked })}
              />
              Новинка
            </label>
            <button type="submit" className="btn-primary">Добавить</button>
          </form>

          {loading ? (
            <div className="loading">Загрузка...</div>
          ) : (
            <div className="products-list">
              {products.map(p => (
                <div key={p.id} className="admin-product-item">
                  <img src={p.image} alt={p.name} className="product-thumb" />
                  <div className="product-info">
                    <h4>{p.name}</h4>
                    <p>{p.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteProduct(p.id!)}>
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-orders">
          {orders.length === 0 ? (
            <p className="empty-text">Заказов пока нет</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span>Заказ #{order.id?.slice(0, 8)}</span>
                  <span className={`order-status status-${order.status}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <p><strong>Клиент:</strong> {order.shippingAddress.name}</p>
                  <p><strong>Телефон:</strong> {order.shippingAddress.phone}</p>
                  <p><strong>Адрес:</strong> {order.shippingAddress.address}</p>
                </div>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <strong>Итого: {order.total.toLocaleString('ru-RU')} ₽</strong>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
