import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductBySlug, getEmiPlans } from '../api/productApi';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import VariantSelector from '../components/VariantSelector';
import EmiPlanList from '../components/EmiPlanList';
import ProceedModal from '../components/ProceedModal';
import { ProductDetailSkeleton } from '../components/Loader';
import ErrorState from '../components/ErrorState';

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emiLoading, setEmiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const data = await getProductBySlug(slug);
      if (data.success && data.product) {
        setProduct(data.product);
        const defaultVariant =
          data.product.variants.find(
            (v) => v._id === data.product.selectedVariantId
          ) || data.product.variants[0];
        setSelectedVariant(defaultVariant);
        setEmiPlans(data.product.emiPlansWithAmounts || []);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        setError('Unable to load product. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchEmiForVariant = useCallback(
    async (variantId) => {
      setEmiLoading(true);
      setSelectedEmi(null);
      try {
        const data = await getEmiPlans(slug, variantId);
        if (data.success && data.emiPlans) {
          setEmiPlans(data.emiPlans);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setEmiLoading(false);
      }
    },
    [slug]
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleStorageChange = (storage) => {
    const variant = product.variants.find(
      (v) => v.storage === storage && v.color === selectedVariant.color
    ) || product.variants.find((v) => v.storage === storage);

    if (variant) {
      setSelectedVariant(variant);
      fetchEmiForVariant(variant._id);
    }
  };

  const handleColorChange = (variant) => {
    setSelectedVariant(variant);
    fetchEmiForVariant(variant._id);
  };

  const handleProceed = () => {
    if (selectedEmi) setModalOpen(true);
  };

  const handleContinue = () => {
    setModalOpen(false);
    alert('EMI plan confirmed! Thank you for choosing 1Fi.');
  };

  if (loading) return <ProductDetailSkeleton />;

  if (notFound) {
    return (
      <div className="max-w-page mx-auto px-4 py-16">
        <ErrorState message="Product not found." />
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-page mx-auto px-4 py-16">
        <ErrorState message={error} onRetry={fetchProduct} />
      </div>
    );
  }

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <ProductGallery
            image={selectedVariant?.image}
            name={product.name}
            variants={product.variants}
            selectedVariant={selectedVariant}
          />
          <div className="lg:hidden">
            <ProductInfo product={product} selectedVariant={selectedVariant} />
          </div>
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onStorageChange={handleStorageChange}
            onColorChange={handleColorChange}
          />
        </div>

        <div className="space-y-8">
          <div className="hidden lg:block">
            <ProductInfo product={product} selectedVariant={selectedVariant} />
          </div>

          <EmiPlanList
            emiPlans={emiPlans}
            selectedEmi={selectedEmi}
            onSelectEmi={setSelectedEmi}
            onProceed={handleProceed}
            loading={emiLoading}
          />
        </div>
      </div>

      <ProceedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleContinue}
        product={product}
        selectedVariant={selectedVariant}
        selectedEmi={selectedEmi}
      />
    </div>
  );
}

export default ProductDetails;
