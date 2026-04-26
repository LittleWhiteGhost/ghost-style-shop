import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';
import ProductIllustration from '../components/ProductIllustration';
import BackButton from '../components/BackButton';
import { Heart, ShoppingBag } from 'lucide-react';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState('M');

  const product = location.state;

  if (!product) {
    navigate('/');
    return null;
  }

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

  const useIllustration = !product.image || !/^https?:/i.test(product.image) || product.image.includes('placehold');

  return (
    <div className="page product-detail">
      <BackButton label="Назад" />

      <div className="product-detail-content">
        <div className="product-detail-image">
          {useIllustration ? (
            <ProductIllustration category={product.category} title={product.name} />
          ) : (
            <img src={product.image} alt={product.name} />
          )}
          {product.isNew && <div className="product-badge">NEW</div>}
        </div>

        <div className="product-detail-info">
          <span className="nf-ribbon">Drop / 01</span>
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
              <ShoppingBag size={18} strokeWidth={2.8} />
              Добавить в корзину
            </button>
            <button
              className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="В избранное"
            >
              <Heart size={20} strokeWidth={2.8} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
