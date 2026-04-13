import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, price, image, isNew }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="product-card">
      {isNew && <div className="badge">NEW</div>}
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
