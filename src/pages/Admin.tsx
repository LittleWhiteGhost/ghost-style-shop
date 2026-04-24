import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProductService, Product } from '../services/products';
import { OrderService, Order } from '../services/orders';
import BackButton from '../components/BackButton';
import { isAdmin } from '../utils/admin';
import { useToast } from '../context/ToastContext';
import { Package, ClipboardList, Trash2, Plus, ShieldCheck } from 'lucide-react';

const EMPTY_PRODUCT: Partial<Product> = {
  name: '',
  price: 0,
  category: '',
  image: '',
  isNew: false,
  description: ''
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>(EMPTY_PRODUCT);

  const userIsAdmin = isAdmin(user?.email);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!userIsAdmin) {
      navigate('/');
    }
  }, [user, userIsAdmin, navigate]);

  useEffect(() => {
    if (!userIsAdmin) return;
    loadData();
  }, [activeTab, userIsAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const prods = await ProductService.getAllProducts();
        setProducts(prods);
      } else {
        const allOrders = await OrderService.getAllOrders();
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
      setNewProduct(EMPTY_PRODUCT);
      showToast({ title: 'Товар добавлен' });
      loadData();
    } catch (error) {
      console.error('Add product error:', error);
      showToast({ title: 'Ошибка при добавлении' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Удалить товар?')) return;
    try {
      await ProductService.deleteProduct(id);
      showToast({ title: 'Товар удалён' });
      loadData();
    } catch (error) {
      console.error('Delete error:', error);
      showToast({ title: 'Ошибка при удалении' });
    }
  };

  if (!user || !userIsAdmin) {
    return null;
  }

  return (
    <div className="page admin-page">
      <BackButton to="/" label="К каталогу" />
      <div className="section-header admin-header">
        <div className="admin-title">
          <ShieldCheck size={26} strokeWidth={2} />
          <h2>Админ-панель</h2>
        </div>
        <p className="section-subtitle">{user.email}</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} strokeWidth={2.2} />
          Товары
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ClipboardList size={16} strokeWidth={2.2} />
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
            <button type="submit" className="btn-primary">
              <Plus size={18} strokeWidth={2.4} />
              Добавить
            </button>
          </form>

          <h3>Все товары ({products.length})</h3>
          <div className="products-list">
            {loading && <p className="empty-text">Загрузка...</p>}
            {!loading && products.length === 0 && (
              <p className="empty-text">Товаров пока нет. Добавьте первый через форму выше.</p>
            )}
            {products.map(p => (
              <div key={p.id} className="admin-product-item">
                <img src={p.image} alt={p.name} className="product-thumb" />
                <div className="product-info">
                  <h4>{p.name}</h4>
                  <p>{p.price.toLocaleString('ru-RU')} ₽ · {p.category}</p>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteProduct(p.id!)}
                  aria-label="Удалить"
                >
                  <Trash2 size={14} strokeWidth={2.2} />
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-orders">
          {loading && <p className="empty-text">Загрузка...</p>}
          {!loading && orders.length === 0 && (
            <p className="empty-text">Заказов пока нет</p>
          )}
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Заказ #{order.id?.slice(0, 8)}</span>
                <span className={`order-status status-${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <p><strong>Клиент:</strong> {order.shippingAddress.name}</p>
                <p><strong>Телефон:</strong> {order.shippingAddress.phone}</p>
                <p><strong>Адрес:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
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
          ))}
        </div>
      )}
    </div>
  );
}
