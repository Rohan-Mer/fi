import { Check } from 'lucide-react';

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function EmiPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-brand-600 bg-brand-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
      aria-pressed={isSelected}
      aria-label={`${formatPrice(plan.monthlyAmount)} per month for ${plan.tenure} months at ${plan.interestRate}% interest`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              isSelected
                ? 'border-brand-600 bg-brand-600'
                : 'border-gray-300 bg-white'
            }`}
            aria-hidden="true"
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {formatPrice(plan.monthlyAmount)}{' '}
              <span className="font-normal text-gray-600">
                x {plan.tenure} months
              </span>
            </p>
            {plan.cashback > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Additional cashback of {formatPrice(plan.cashback)}
              </p>
            )}
          </div>
        </div>
        <span
          className={`text-sm font-medium whitespace-nowrap ${
            plan.interestRate === 0 ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          {plan.interestRate}% interest
        </span>
      </div>
    </button>
  );
}

export default EmiPlanCard;
