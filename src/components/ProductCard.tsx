import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  description?: string;
}

export default function ProductCard({ id, name, price, image, isNew, description }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image });
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
      <button className="wishlist-btn" onClick={handleToggleWishlist}>
        <svg viewBox="0 0 24 24" fill={isInWishlist(id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p className="price">{price.toLocaleString('ru-RU')} ₽</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        В корзину
      </button>
    </div>
  );
}
