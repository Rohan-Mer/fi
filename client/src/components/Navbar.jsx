import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
          >
            <Smartphone className="w-7 h-7 text-brand-600" aria-hidden="true" />
            <span>1Fi</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-3 py-2"
            >
              Shop
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
