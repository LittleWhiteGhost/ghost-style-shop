import { useMemo, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { ProductService, Product } from '../services/products';
import { useLang } from '../i18n/LanguageContext';

const mockProducts: Product[] = [
  { id: '1', name: 'Футболка Ghost', price: 2990, category: 'tshirt', image: '', description: 'Стильная футболка' },
  { id: '2', name: 'Худи Style', price: 4990, category: 'hoodie', image: '', description: 'Теплое худи' },
  { id: '3', name: 'Джинсы Dark', price: 3990, category: 'jeans', image: '', description: 'Классические джинсы' },
  { id: '4', name: 'Кепка Ghost', price: 1490, category: 'cap', image: '', description: 'Стильная кепка' },
  { id: '5', name: 'Рубашка Classic', price: 3490, category: 'shirt', image: '', description: 'Классическая рубашка' },
  { id: '6', name: 'Свитер Warm', price: 4290, category: 'sweater', image: '', description: 'Теплый свитер' },
];

const CHIPS: Array<{ key: string; tKey: 'catTshirt' | 'catHoodie' | 'catJeans' | 'catCap' | 'catShirt' | 'catSweater' }> = [
  { key: 'tshirt', tKey: 'catTshirt' },
  { key: 'hoodie', tKey: 'catHoodie' },
  { key: 'jeans', tKey: 'catJeans' },
  { key: 'cap', tKey: 'catCap' },
  { key: 'shirt', tKey: 'catShirt' },
  { key: 'sweater', tKey: 'catSweater' },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [active, setActive] = useState<string[]>([]);
  const { t } = useLang();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const firebaseProducts = await ProductService.getAllProducts();
        if (firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };

    loadProducts();
  }, []);

  const visible = useMemo(() => {
    if (active.length === 0) return products;
    return products.filter(p => active.includes((p.category || '').toLowerCase()));
  }, [products, active]);

  const toggle = (key: string) => {
    setActive(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  return (
    <div className="page">
      <Hero />

      <div className="nf-strip">
        <span>{t('marqueeFreeShipping')}</span>
        <span>{t('marqueeAngular')}</span>
        <span>{t('marqueeCapsule')}</span>
        <span>{t('marqueeWorldwide')}</span>
        <span>{t('marqueeHalftone')}</span>
      </div>

      <div className="nf-section-head">
        <div className="nf-section-head__num">№01</div>
        <h2 className="nf-section-head__title">{t('catalogTitle')}</h2>
        <div className="nf-section-head__meta">{t('catalogMeta')}</div>
      </div>

      <div className="catalog-chips" role="toolbar" aria-label={t('catalogTitle')}>
        {CHIPS.map(c => {
          const on = active.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              className={`chip ${on ? 'chip--on' : ''}`}
              onClick={() => toggle(c.key)}
              aria-pressed={on}
            >
              {on && <X size={14} strokeWidth={2.8} className="chip__x" />}
              <span>{t(c.tKey)}</span>
            </button>
          );
        })}
      </div>

      <div className="catalog-meta-row">
        <span className="catalog-count">{String(visible.length).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
        <span className="catalog-divider" aria-hidden="true" />
      </div>

      <div className="product-grid">
        {visible.map(product => (
          <ProductCard
            key={product.id}
            id={product.id!}
            name={product.name}
            price={product.price}
            image={product.image}
            isNew={product.isNew}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
