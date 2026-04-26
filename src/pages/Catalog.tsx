import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { ProductService, Product } from '../services/products';

const mockProducts: Product[] = [
  { id: '1', name: 'Футболка Ghost', price: 2990, category: 'tshirt', image: '', description: 'Стильная футболка' },
  { id: '2', name: 'Худи Style', price: 4990, category: 'hoodie', image: '', description: 'Теплое худи' },
  { id: '3', name: 'Джинсы Dark', price: 3990, category: 'jeans', image: '', description: 'Классические джинсы' },
  { id: '4', name: 'Кепка Ghost', price: 1490, category: 'cap', image: '', description: 'Стильная кепка' },
  { id: '5', name: 'Рубашка Classic', price: 3490, category: 'shirt', image: '', description: 'Классическая рубашка' },
  { id: '6', name: 'Свитер Warm', price: 4290, category: 'sweater', image: '', description: 'Теплый свитер' },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

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

  return (
    <div className="page">
      <Hero />

      <div className="nf-strip">
        <span>Free shipping &gt; 5000₽</span>
        <span>Angular silhouettes</span>
        <span>Capsule drop 01</span>
        <span>Worldwide</span>
        <span>Halftone print</span>
      </div>

      <div className="nf-section-head">
        <div className="nf-section-head__num">№01</div>
        <h2 className="nf-section-head__title">Каталог</h2>
        <div className="nf-section-head__meta">All products / Drop 01</div>
      </div>

      <div className="product-grid">
        {products.map(product => (
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
