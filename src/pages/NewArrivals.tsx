import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductService, Product } from '../services/products';

const mockNewProducts: Product[] = [
  { id: '7', name: 'Куртка Winter Ghost', price: 7990, category: 'jacket', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Jacket&font=montserrat', isNew: true },
  { id: '8', name: 'Кроссовки Style Pro', price: 6490, category: 'shoes', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Sneakers&font=montserrat', isNew: true },
  { id: '9', name: 'Брюки Slim Fit', price: 3790, category: 'pants', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Pants&font=montserrat', isNew: true },
  { id: '10', name: 'Пуховик Arctic', price: 9990, category: 'coat', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Coat&font=montserrat', isNew: true },
  { id: '11', name: 'Жилет Urban', price: 4490, category: 'vest', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Vest&font=montserrat', isNew: true },
  { id: '12', name: 'Толстовка Street', price: 5290, category: 'sweatshirt', image: 'https://placehold.co/400x400/1a1a1a/ff6a00?text=Sweatshirt&font=montserrat', isNew: true },
];

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>(mockNewProducts);

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
      <div className="section-header">
        <h2>Новинки</h2>
        <p className="section-subtitle">Новые поступления этой недели</p>
        <div className="new-tag">NEW SEASON</div>
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
          />
        ))}
      </div>
    </div>
  );
}
