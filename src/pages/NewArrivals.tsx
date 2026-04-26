import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductService, Product } from '../services/products';
import { useLang } from '../i18n/LanguageContext';

const mockNewProducts: Product[] = [
  { id: '7', name: 'Куртка Winter', price: 7990, category: 'jacket', image: '', isNew: true },
  { id: '8', name: 'Кроссовки Pro', price: 6490, category: 'sneaker', image: '', isNew: true },
  { id: '9', name: 'Брюки Slim', price: 3790, category: 'pants', image: '', isNew: true },
  { id: '10', name: 'Пуховик Arctic', price: 9990, category: 'coat', image: '', isNew: true },
  { id: '11', name: 'Жилет Urban', price: 4490, category: 'vest', image: '', isNew: true },
  { id: '12', name: 'Толстовка Street', price: 5290, category: 'sweatshirt', image: '', isNew: true },
];

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>(mockNewProducts);
  const { t } = useLang();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const firebaseProducts = await ProductService.getNewProducts();
        if (firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="page">
      <div className="nf-callout">
        <div>
          <h3>Drop 02 — Winter Capsule</h3>
          <p>{t('callout')}</p>
        </div>
        <a className="nf-callout__cta" href="#products">{t('heroCta')}</a>
      </div>

      <div className="nf-section-head" id="products">
        <div className="nf-section-head__num">№02</div>
        <h2 className="nf-section-head__title">{t('newArrivalsTitle')}</h2>
        <div className="nf-section-head__meta">New season / Drop 02</div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id!}
            name={product.name}
            price={product.price}
            image={product.image}
            isNew={true}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
