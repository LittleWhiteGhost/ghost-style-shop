import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useState, useEffect } from 'react';
import { ProductService, Product } from '../services/products';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState<Product | null>(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  // BUG FIX: если нет state (прямая ссылка / обновление страницы) — загружаем из Firebase
  useEffect(() => {
    if (!location.state && id) {
      setLoading(true);
      ProductService.getAllProducts()
        .then(products => {
          const found = products.find(p => p.id === id);
          if (found) {
            setProduct(found);
          } else {
            navigate('/');
          }
        })
        .catch(() => navigate('/'))
        .finally(() => setLoading(false));
    }
  }, [id, location.state, navigate]);

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Загрузка...</p>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image
    });
    showToast({
      title: `${product.name} (${selectedSize}) добавлен в корзину`,
      linkText: 'Перейти в корзину',
      linkTo: '/cart'
    });
  };

  return (
    <div className="page product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Назад
      </button>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          {product.isNew && <div className="badge">NEW</div>}
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString('ru-RU')} ₽</p>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="size-selector">
            <h3>Размер</h3>
            <div className="size-options">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-add-cart" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            <button
              className={`btn-wishlist ${isInWishlist(product.id!) ? 'active' : ''}`}
              onClick={() => toggleWishlist({ id: product.id!, name: product.name, price: product.price, image: product.image, isNew: product.isNew })}
            >
              <svg viewBox="0 0 24 24" fill={isInWishlist(product.id!) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
