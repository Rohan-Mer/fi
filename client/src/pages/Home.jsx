import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError('Unable to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Shop Products on EMI
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Buy the latest smartphones with flexible EMI plans backed by mutual funds.
          Zero interest options available.
        </p>
      </div>

      {loading && <Loader count={3} />}

      {error && !loading && (
        <ErrorState message={error} onRetry={fetchProducts} />
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 py-12">No products available.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
