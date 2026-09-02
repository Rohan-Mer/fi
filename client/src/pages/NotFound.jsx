import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="max-w-page mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page not found</h2>
      <p className="text-gray-500 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        <Home className="w-4 h-4" />
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
