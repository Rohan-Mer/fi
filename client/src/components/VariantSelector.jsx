function VariantSelector({ variants, selectedVariant, onStorageChange, onColorChange }) {
  const storageOptions = [...new Set(variants.map((v) => v.storage))];
  const colorOptions = variants
    .filter((v) => v.storage === selectedVariant?.storage)
    .reduce((acc, v) => {
      if (!acc.find((c) => c.color === v.color)) acc.push(v);
      return acc;
    }, []);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Storage</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select storage">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              type="button"
              onClick={() => onStorageChange(storage)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                selectedVariant?.storage === storage
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
              aria-pressed={selectedVariant?.storage === storage}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Color</p>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Select color">
          {colorOptions.map((variant) => (
            <button
              key={variant._id}
              type="button"
              onClick={() => onColorChange(variant)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                selectedVariant?._id === variant._id
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
              aria-pressed={selectedVariant?._id === variant._id}
              aria-label={`Select ${variant.color}`}
            >
              <span
                className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: variant.colorHex }}
                aria-hidden="true"
              />
              {variant.color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VariantSelector;
