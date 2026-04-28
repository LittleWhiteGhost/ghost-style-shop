import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  description?: string;
}

// BUG FIX: картокчка и детальная страница использовали разные форматы id в корзине.
// Унифицируем: из карточки добавляем с размером M по умолчанию, как и в ProductDetail.
const DEFAULT_SIZE = 'M';

export default function ProductCard({ id, name, price, image, isNew, description }: ProductCardProps) {
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const cartId = `${id}-${DEFAULT_SIZE}`;
  const quantity = getQuantity(cartId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: cartId, name: `${name} (${DEFAULT_SIZE})`, price, image });
    showToast({
      title: `${name} добавлен в корзину`,
      linkText: 'Перейти в корзину',
      linkTo: '/cart'
    });
  };

  const handleInc = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(cartId, quantity + 1);
  };

  const handleDec = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(cartId, quantity - 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist({ id, name, price, image, isNew });
  };

  const handleClick = () => {
    navigate(`/product/${id}`, { state: { id, name, price, image, isNew, description } });
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {isNew && <div className="badge">NEW</div>}
      <button className="wishlist-btn" onClick={handleToggleWishlist} aria-label="В избранное">
        <Heart size={20} strokeWidth={2} fill={isInWishlist(id) ? 'currentColor' : 'none'} />
      </button>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p className="price">{price.toLocaleString('ru-RU')} ₽</p>
      {quantity === 0 ? (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingBag size={16} strokeWidth={2.2} />
          В корзину
        </button>
      ) : (
        <div className="qty-control" onClick={(e) => e.stopPropagation()}>
          <button className="qty-btn" onClick={handleDec} aria-label="Уменьшить">
            <Minus size={16} strokeWidth={2.4} />
          </button>
          <span className="qty-value">
            {quantity}<small>шт</small>
          </span>
          <button className="qty-btn" onClick={handleInc} aria-label="Увеличить">
            <Plus size={16} strokeWidth={2.4} />
          </button>
        </div>
      )}
    </div>
  );
}
