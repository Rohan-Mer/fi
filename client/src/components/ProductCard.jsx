import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            {product.variantCount} variant{product.variantCount !== 1 ? 's' : ''} available
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(product.startingPrice)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all">
              View EMI Plans
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
