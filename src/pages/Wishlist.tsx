import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { useLang } from '../i18n/LanguageContext';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { items } = useWishlist();
  const { t } = useLang();

  if (items.length === 0) {
    return (
      <div className="page">
        <BackButton to="/" label={t('cartGoToCatalog')} />
        <div className="section-header">
          <h2>{t('wishlistTitle')}</h2>
        </div>
        <div className="empty-cart">
          <Heart size={72} strokeWidth={1.5} />
          <h3>{t('wishlistEmpty')}</h3>
          <p>{t('wishlistEmptyHint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <BackButton to="/" label={t('cartGoToCatalog')} />
      <div className="section-header">
        <h2>{t('wishlistTitle')}</h2>
        <p className="section-subtitle">{t('accountFavoritesCount', { n: items.length })}</p>
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
