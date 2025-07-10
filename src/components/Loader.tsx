const Loader = () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-300 rounded-md w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md w-24 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded-md w-1/3 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-2/3 mb-4"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-4 bg-gray-300 rounded-md w-16"></div>
                      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                      <div className="h-4 bg-gray-300 rounded-md w-24"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-300 rounded-md w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
