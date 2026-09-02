import { X } from 'lucide-react';
import { useEffect } from 'react';

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function ProceedModal({
  isOpen,
  onClose,
  onContinue,
  product,
  selectedVariant,
  selectedEmi,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !selectedEmi || !selectedVariant) return null;

  const details = [
    { label: 'Product', value: product.name },
    { label: 'Variant', value: selectedVariant.name },
    { label: 'Color', value: selectedVariant.color },
    { label: 'Product price', value: formatPrice(selectedVariant.price) },
    { label: 'Monthly EMI', value: formatPrice(selectedEmi.monthlyAmount) },
    { label: 'Tenure', value: `${selectedEmi.tenure} months` },
    { label: 'Interest rate', value: `${selectedEmi.interestRate}%` },
    {
      label: 'Cashback',
      value:
        selectedEmi.cashback > 0
          ? formatPrice(selectedEmi.cashback)
          : 'None',
    },
    { label: 'Total payable', value: formatPrice(selectedEmi.totalPayable) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">
            Confirm EMI Plan
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-gray-900 text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 py-3 px-4 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProceedModal;
