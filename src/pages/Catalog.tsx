import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductService, Product } from '../services/products';

// Моковые данные для демонстрации
const mockProducts: Product[] = [
  { id: '1', name: 'Футболка Ghost', price: 2990, category: 'tshirt', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=T-Shirt', description: 'Стильная футболка' },
  { id: '2', name: 'Худи Style', price: 4990, category: 'hoodie', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Hoodie', description: 'Теплое худи' },
  { id: '3', name: 'Джинсы Dark', price: 3990, category: 'jeans', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Jeans', description: 'Классические джинсы' },
  { id: '4', name: 'Кепка Ghost', price: 1490, category: 'cap', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Cap', description: 'Стильная кепка' },
  { id: '5', name: 'Рубашка Classic', price: 3490, category: 'shirt', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Shirt', description: 'Классическая рубашка' },
  { id: '6', name: 'Свитер Warm', price: 4290, category: 'sweater', image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Sweater', description: 'Теплый свитер' },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    // Попытка загрузить из Firebase, если не получится - используем моковые данные
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
      <div className="section-header">
        <h2>Каталог</h2>
        <p className="section-subtitle">Стильная одежда на каждый день</p>
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
          />
        ))}
      </div>
    </div>
  );
}
