import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import ProductIllustration from './ProductIllustration';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  category?: string;
  description?: string;
}

function shouldUseIllustration(image: string | undefined): boolean {
  if (!image) return true;
  const lc = image.toLowerCase();
  return (
    lc.includes('placehold') ||
    lc.includes('via.placeholder') ||
    lc.startsWith('data:') === false && lc.startsWith('http') === false ||
    lc === ''
  );
}

export default function ProductCard({ id, name, price, image, isNew, category, description }: ProductCardProps) {
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const quantity = getQuantity(id);
  const useIllustration = shouldUseIllustration(image);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image });
    showToast({
      title: `${name} добавлен в корзину`,
      linkText: 'Перейти в корзину',
      linkTo: '/cart'
    });
  };

  const handleInc = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(id, quantity + 1);
  };

  const handleDec = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(id, quantity - 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist({ id, name, price, image, isNew });
  };

  const handleClick = () => {
    navigate(`/product/${id}`, { state: { id, name, price, image, isNew, description, category } });
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {isNew && <div className="product-badge">NEW</div>}
      <div className="product-image">
        <button
          className={`wishlist-btn ${isInWishlist(id) ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label="В избранное"
        >
          <Heart size={18} strokeWidth={2.8} fill={isInWishlist(id) ? 'currentColor' : 'none'} />
        </button>
        {useIllustration ? (
          <ProductIllustration category={category} title={name} />
        ) : (
          <img src={image} alt={name} />
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{price.toLocaleString('ru-RU')} ₽</p>
        {quantity === 0 ? (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingBag size={16} strokeWidth={2.8} />
            В корзину
          </button>
        ) : (
          <div className="qty-control" onClick={(e) => e.stopPropagation()}>
            <button className="qty-btn" onClick={handleDec} aria-label="Уменьшить">
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="qty-value">
              {quantity} шт
            </span>
            <button className="qty-btn" onClick={handleInc} aria-label="Увеличить">
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
