function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductInfo({ product, selectedVariant }) {
  const discount =
    selectedVariant?.mrp > selectedVariant?.price
      ? Math.round(
          ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100
        )
      : 0;

  return (
    <div>
      <p className="text-sm font-medium text-brand-600 uppercase tracking-wide mb-1">
        {product.brand}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(selectedVariant?.price)}
        </span>
        {selectedVariant?.mrp > selectedVariant?.price && (
          <span className="text-lg text-gray-400 line-through">
            {formatPrice(selectedVariant.mrp)}
          </span>
        )}
        {discount > 0 && (
          <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
            {discount}% off
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}

export default ProductInfo;
