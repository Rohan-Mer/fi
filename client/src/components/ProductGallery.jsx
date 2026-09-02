function ProductGallery({ image, name, variants, selectedVariant }) {
  const thumbnails = variants.filter(
    (v, index, self) =>
      self.findIndex((item) => item.image === v.image) === index
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="aspect-square max-h-[480px] flex items-center justify-center bg-gray-50 p-6">
          <img
            src={image}
            alt={`${name} - ${selectedVariant?.color || ''}`}
            className="max-h-full max-w-full object-contain transition-opacity duration-300"
          />
        </div>
      </div>

      {thumbnails.length > 1 && (
        <div className="flex gap-3" role="list" aria-label="Product image thumbnails">
          {thumbnails.map((variant) => (
            <div
              key={variant._id}
              role="listitem"
              className={`w-16 h-16 rounded-lg border-2 overflow-hidden bg-gray-50 ${
                selectedVariant?.image === variant.image
                  ? 'border-brand-600 ring-2 ring-brand-100'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={variant.image}
                alt={`${variant.color} variant`}
                className="w-full h-full object-contain p-1"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
