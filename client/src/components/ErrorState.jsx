import { AlertCircle, RefreshCw } from 'lucide-react';

function ErrorState({ message = 'Unable to load product. Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" aria-hidden="true" />
      <p className="text-gray-700 text-lg mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
