import EmiPlanCard from './EmiPlanCard';

function EmiPlanList({ emiPlans, selectedEmi, onSelectEmi, onProceed, loading }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        EMI plans backed by mutual funds
      </h2>

      {loading ? (
        <div className="space-y-3" aria-label="Loading EMI plans">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" role="radiogroup" aria-label="Select EMI plan">
          {emiPlans.map((plan) => (
            <EmiPlanCard
              key={plan.tenure}
              plan={plan}
              isSelected={selectedEmi?.tenure === plan.tenure}
              onSelect={onSelectEmi}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onProceed}
        disabled={!selectedEmi}
        className="w-full mt-6 py-4 px-6 bg-brand-600 text-white text-lg font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Proceed with selected plan
      </button>
    </div>
  );
}

export default EmiPlanList;
