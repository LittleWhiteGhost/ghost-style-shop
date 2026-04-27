import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import ProductIllustration from '../components/ProductIllustration';
import BackButton from '../components/BackButton';
import { useLang } from '../i18n/LanguageContext';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { t } = useLang();
  const [selectedSize, setSelectedSize] = useState('M');
  const [slide, setSlide] = useState(1);

  const product = location.state;

  if (!product) {
    navigate('/');
    return null;
  }

  const total = 4;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image
    });
    showToast({
      title: t('toastAdded', { name: `${product.name} (${selectedSize})` }),
      linkText: t('toastGoToCart'),
      linkTo: '/cart'
    });
  };

  const useIllustration = !product.image || !/^https?:/i.test(product.image) || product.image.includes('placehold');

  return (
    <div className="page product-detail">
      <BackButton />

      <div className="product-detail-grid">
        <div className="pd-media">
          <div className="pd-media__frame">
            {useIllustration ? (
              <ProductIllustration category={product.category} title={product.name} />
            ) : (
              <img src={product.image} alt={product.name} />
            )}
            {product.isNew && <span className="product-badge product-badge--detail">/ {t('newBadge')}</span>}
          </div>

          <div className="pd-thumbnav" aria-label={t('productThumbHint')}>
            <button
              type="button"
              className="pd-thumbnav__btn"
              onClick={() => setSlide(s => Math.max(1, s - 1))}
              aria-label="Prev"
            >
              <ArrowLeft size={16} strokeWidth={2.6} />
            </button>
            <span className="pd-thumbnav__count">
              {String(slide).padStart(2, '0')}
              <span className="pd-thumbnav__dash" />
              {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="pd-thumbnav__btn"
              onClick={() => setSlide(s => Math.min(total, s + 1))}
              aria-label="Next"
            >
              <ArrowRight size={16} strokeWidth={2.6} />
            </button>
          </div>
        </div>

        <div className="pd-info">
          <span className="pd-eyebrow">/ {product.category || 'Capsule 01'}</span>
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-price">{product.price.toLocaleString('ru-RU')} ₽</p>
          <div className="pd-rule" />

          {product.description && (
            <p className="pd-description">{product.description}</p>
          )}

          <div className="pd-section">
            <span className="pd-section__label">{t('productSize')}</span>
            <div className="pd-sizes">
              {sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`pd-size ${selectedSize === size ? 'pd-size--on' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-actions">
            <button className="pd-add" onClick={handleAddToCart}>
              {t('productAdd')}
            </button>
            <button
              className={`pd-fav ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label={t('toggleFavorite')}
            >
              <Heart size={20} strokeWidth={2.6} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
