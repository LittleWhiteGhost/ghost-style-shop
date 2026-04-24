import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="page">
        <BackButton to="/" label="К каталогу" />
        <div className="section-header">
          <h2>Избранное</h2>
        </div>
        <div className="empty-cart">
          <Heart size={72} strokeWidth={1.5} />
          <h3>Список избранного пуст</h3>
          <p>Добавьте товары, которые вам понравились</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <BackButton to="/" label="К каталогу" />
      <div className="section-header">
        <h2>Избранное</h2>
        <p className="section-subtitle">{items.length} товар(ов)</p>
      </div>
      <div className="product-grid">
        {items.map(item => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            isNew={item.isNew}
          />
        ))}
      </div>
    </div>
  );
}
