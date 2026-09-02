function Loader({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
        >
          <div className="skeleton h-48 w-full" />
          <div className="p-5 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-10 w-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="skeleton h-80 lg:h-[480px] w-full rounded-xl" />
          <div className="skeleton h-6 w-2/3" />
          <div className="flex gap-2">
            <div className="skeleton h-10 w-20 rounded-lg" />
            <div className="skeleton h-10 w-20 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-10 w-1/2" />
          <div className="skeleton h-6 w-full" />
          <div className="space-y-3 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-20 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
