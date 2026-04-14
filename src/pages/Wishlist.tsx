import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="section-header">
          <h2>Избранное</h2>
        </div>
        <div className="empty-cart">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h3>Список избранного пуст</h3>
          <p>Добавьте товары, которые вам понравились</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
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
